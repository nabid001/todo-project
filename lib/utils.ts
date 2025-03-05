import { Priority } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseData = (data: any) => {
  return JSON.parse(JSON.stringify(data));
};

export const priorityConfig: Record<
  Priority,
  { name: React.ReactNode; color: string }
> = {
  high: {
    name: "High",
    color: "text-red-500 dark:text-red-400",
  },
  medium: {
    name: "Medium",
    color: "text-yellow-500 dark:text-yellow-400",
  },
  low: {
    name: "Low",
    color: "text-blue-500 dark:text-blue-400",
  },
};
