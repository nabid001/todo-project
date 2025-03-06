"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "../ui/button";
import { createUser } from "@/database/actions/user.actions";
import { useRouter } from "next/navigation";
import { hash } from "bcryptjs";
import { Loader2Icon } from "lucide-react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const hashedPassword = await hash(password, 10);
    try {
      await createUser({
        name,
        email,
        password: hashedPassword,
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor="name" className="text-sm text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="border w-full p-1 text-gray-700 rounded-sm border-gray-200"
          required
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor="email" className="text-sm text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="border w-full p-1 text-gray-700 rounded-sm border-gray-200"
          required
        />
      </div>
      <div className="flex flex-col gap-1 items-start">
        <label htmlFor="password" className="text-sm text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="border w-full p-1 text-gray-700 rounded-sm border-gray-200"
          required
          minLength={8}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-500 hover:bg-indigo-600 transition-colors"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span>Sign Up</span>
            <Loader2Icon className="animate-spin h-4 w-4" aria-hidden="true" />
          </div>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  );
};

export default SignupForm;
