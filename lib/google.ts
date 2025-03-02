"use server";

import { google } from "googleapis";
import { clerkClient } from "@clerk/nextjs/server";
import { TaskInput, TaskResponse } from "@/types/types";

// Define types for better type safety

export async function createGoogleTask({
  title,
  description,
  dueDate,
  status,
  priority,
  clerkId,
}: TaskInput): Promise<TaskResponse> {
  try {
    const oAuthClient = await getOAuthClient(clerkId);
    if (!oAuthClient) {
      return { success: false, error: "Not authenticated with Google" };
    }

    const tasks = google.tasks({ version: "v1", auth: oAuthClient });

    let taskListId: string;
    try {
      // First try to get existing task lists
      const taskLists = await tasks.tasklists.list({
        maxResults: 1,
      });

      if (taskLists.data.items && taskLists.data.items.length > 0) {
        taskListId = taskLists.data.items[0].id!;
      } else {
        const newTaskList = await tasks.tasklists.insert({
          requestBody: {
            title: "My Tasks",
          },
        });
        taskListId = newTaskList.data.id!;
      }
    } catch (error) {
      console.error("Error getting/creating task list:", error);
      return { success: false, error: "Failed to access task lists" };
    }

    const notes = [
      description,
      priority ? `Priority: ${priority.toUpperCase()}` : "",
    ].join("\n");

    // Create the task
    const response = await tasks.tasks.insert({
      tasklist: taskListId,
      requestBody: {
        title,
        notes,
        due: dueDate.toISOString(),
        status,
      },
    });

    return {
      success: true,
      task: response.data.id,
      taskListId,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to create task. Please try again.",
    };
  }
}

export async function getOAuthClient(clerkId: string) {
  try {
    const clerk = await clerkClient();
    const tokenResponse = await clerk.users.getUserOauthAccessToken(
      clerkId,
      "google"
    );

    if (tokenResponse.data.length === 0 || !tokenResponse.data[0].token) {
      console.log("No Google OAuth token found for user");
      return null;
    }

    if (
      !process.env.GOOGLE_OAUTH_CLIENT_ID ||
      !process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
      !process.env.GOOGLE_OAUTH_REDIRECT_URL
    ) {
      throw new Error("Missing required Google OAuth environment variables");
    }

    const client = new google.auth.OAuth2(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      process.env.GOOGLE_OAUTH_REDIRECT_URL
    );

    client.setCredentials({
      access_token: tokenResponse.data[0].token,
    });

    return client;
  } catch (error) {
    console.error("Error getting OAuth client:", error);
    return null;
  }
}
