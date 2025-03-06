import { signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";

const SignInForm = async () => {
  return (
    <section className="flex flex-col min-w-sm justify-center bg-slate-50 px-5 py-5 shadow rounded-lg min-h-full">
      <h1 className="text-2xl font-bold text-slate-800 text-start">
        Welcome to Todo
      </h1>
      <p className="text-sm text-slate-500">Please sign in to continue</p>
      <form
        action={async () => {
          "use server";
          await signIn("google", { callbackUrl: "/" });
        }}
        className="flex items-center justify-center mt-5"
      >
        <button
          type="submit"
          className="p-3 bg-slate-50 rounded-md shadow flex w-full gap-3 cursor-pointer"
        >
          <Image
            src={"/google-icon.png"}
            alt="google-icon"
            width={20}
            height={20}
            className="object-cover"
          />
          <p className="text-base text-gray-600">Sign Up With Google</p>
        </button>
      </form>

      <div className="my-7 flex items-center justify-center gap-3">
        <div className="w-full h-[2px] bg-blue-950/60" />
        <p className="text-sm text-slate-500">or</p>
        <div className="w-full h-[2px] bg-blue-950/60" />
      </div>

      <>
        <form
          action={async (formData: FormData) => {
            "use server";
            const email = formData.get("email");
            const password = formData.get("password");

            await signIn("credentials", {
              email,
              password,
            });
          }}
          className="space-y-4"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="border w-full p-1 text-gray-700 rounded-sm border-gray-200"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="border w-full p-1 text-gray-700 rounded-sm border-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 cursor-pointer transition-colors rounded-md text-white py-2"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center gap-1 mt-5">
          <p className="text-sm text-gray-500">Create an account</p>
          <Link
            href="/sign-up"
            className="text-sm text-indigo-500 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </>
    </section>
  );
};

export default SignInForm;
