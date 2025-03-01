import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";

const Header = () => {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">My Todo</h1>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
      <p className="text-base mt-1 text-slate-600">
        Organize, filter, and manage your tasks efficiently
      </p>
    </div>
  );
};

export default Header;
