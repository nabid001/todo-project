import Google from "next-auth/providers/google";
import NextAuth, { type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/tasks",
        },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Enter your email", type: "email", name: "email" },
        password: {
          label: "Enter your password",
          type: "password",
          name: "password",
        },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email) {
          throw new Error("Please provide email. email field is empty");
        }
        if (!password) {
          throw new Error("Please provide password. password field is empty");
        }

        const response = await fetch(`${process.env.BASE_URL}/api/users/find`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await response.json();

        if (!user) {
          throw new Error("User not found");
        }

        if (!user.password) {
          throw new Error("User password field not found");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid password. password not match");
        }

        return {
          id: user._id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user) {
        return false;
      }

      const baseUrl = process.env.BASE_URL!;

      const response = await fetch(`${baseUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          picture: user.image,
          provider: account?.provider,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return true;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.access_token && token.provider) {
        session.user.access_token = token.access_token as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account?.access_token && account.provider) {
        token.access_token = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
  },
});
