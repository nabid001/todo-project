import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return (
    <main className="flex bg-slate-50 items-center justify-center min-h-screen">
      {children}
    </main>
  );
};

export default layout;
