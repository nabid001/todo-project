import { auth, signIn } from "@/auth";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import SignOutButton from "./SignOutButton";
import Image from "next/image";
import { getUser } from "@/database/actions/user.actions";

const Header = async () => {
  const session = await auth();
  const user = await getUser(session?.user?.email);

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">My Todo</h1>
        {session?.user && (
          <div className="flex items-center justify-center gap-1">
            <p className="text-sm text-slate-800 font-semibold capitalize">
              {session.user.name}
            </p>
            {" | "}
            <p className="text-sm text-slate-800 font-semibold">
              {session.user.email}
            </p>
            <Menubar className="border-none p-0 w-fit">
              <MenubarMenu>
                <MenubarTrigger className="bg-white  shadow-none w-fit">
                  <Image
                    src={session?.user?.image || "/user-icon.svg"}
                    alt={"icon"}
                    width={25}
                    height={25}
                    className="object-contain rounded-full"
                  />
                </MenubarTrigger>
                <MenubarContent
                  className="min-w-[150px] flex flex-col items-start gap-1"
                  align="end"
                >
                  <SignOutButton />
                  {user?.provider === "credentials" && (
                    <form
                      action={async () => {
                        "use server";
                        await signIn("google", {
                          callbackUrl: "/",
                        });
                      }}
                      className=""
                    >
                      <button
                        type="submit"
                        className="p-3 rounded-md flex w-full gap-3 cursor-pointer"
                      >
                        <Image
                          src={"/google-icon.png"}
                          alt="google-icon"
                          width={20}
                          height={20}
                          className="object-cover"
                        />
                        <p className="text-base text-gray-600 font-semibold">
                          Link
                        </p>
                      </button>
                    </form>
                  )}
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
