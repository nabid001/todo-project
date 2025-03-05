import React from "react";
import { signIn } from "@/auth";
import Image from "next/image";

const SignIn = () => {
  return (
    <section className="flex flex-col justify-center bg-slate-50 p-5 shadow rounded-md min-h-full">
      <h1 className="text-3xl font-bold text-slate-800 text-center">
        Welcome to Todo
      </h1>
      <p className="text-center text-base text-slate-500 mb-3">
        Welcome back! Please sign in to continue
      </p>
      <form
        action={async () => {
          "use server";
          await signIn("google", { callbackUrl: "/" });
        }}
        className="flex items-center justify-center"
      >
        <button
          type="submit"
          className="p-3 bg-slate-50 rounded-md shadow flex gap-1 cursor-pointer"
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
    </section>
  );
};

export default SignIn;
