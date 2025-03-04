import React from "react";
import { signIn } from "@/auth";
import Image from "next/image";

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { callbackUrl: "/" });
      }}
    >
      <button
        type="submit"
        className="p-5 bg-slate-50 rounded-md shadow flex gap-1 cursor-pointer items-center"
      >
        <Image
          src={"/google-icon.png"}
          alt="google-icon"
          width={25}
          height={25}
        />
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
