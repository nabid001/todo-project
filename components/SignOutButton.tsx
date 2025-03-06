import React from "react";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

const SignOutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/sign-in" });
      }}
    >
      <Button variant={"ghost"} type="submit" className="w-full">
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutButton;
