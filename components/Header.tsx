import { auth } from "@/auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import SignOutButton from "./SignOutButton";

const Header = async () => {
  const session = await auth();
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">My Todo</h1>
        {session?.user && (
          <div className="flex items-center gap-1">
            <p className="text-sm text-slate-800 font-semibold capitalize">
              {session.user.name}
            </p>
            <Menubar className="border-none p-0 w-fit">
              <MenubarMenu>
                <MenubarTrigger className="bg-white shadow-none w-fit">
                  <Avatar>
                    <AvatarImage src={session?.user?.image} />
                    <AvatarFallback>{session.user.name}</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent className="min-w-fit" align="end">
                  <SignOutButton />
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        )}
      </div>
      <p className="text-base mt-1 text-slate-600">
        Organize, filter, and manage your tasks efficiently
      </p>
    </div>
  );
};

export default Header;
