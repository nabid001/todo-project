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
  { icon: React.ReactNode; color: string }
> = {
  high: {
    icon: "High",
    color: "text-red-500 dark:text-red-400",
  },
  medium: {
    icon: "Medium",
    color: "text-yellow-500 dark:text-yellow-400",
  },
  low: {
    icon: "Low",
    color: "text-blue-500 dark:text-blue-400",
  },
};
