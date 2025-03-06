import React from "react";
import { signIn } from "@/auth";

const SignInForm = async () => {
  return (
    <section className="flex flex-col justify-center bg-slate-50 p-5 shadow rounded-md min-h-full">
      <h1 className="text-3xl font-bold text-slate-800 text-center">
        Welcome to Todo
      </h1>
      <p className="text-center text-base text-slate-500 mb-3">
        Welcome back! Please sign in to continue
      </p>
      <form
        action={async (formData) => {
          "use server";

          const email = await formData.get("email");
          const password = await formData.get("password");

          await signIn("credentials", {
            email,
            password,
          });
        }}
        className="flex flex-col gap-5"
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
    </section>
  );
};

export default SignInForm;
