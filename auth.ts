import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDatabase } from "./database/db";
import User from "./database/models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/tasks",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user || !account) return false;

      await connectToDatabase();

      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        existingUser = await User.create({
          googleId: account.providerAccountId,
          name: user.name,
          email: user.email,
          picture: user.image,
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (token && token.access_token) {
        session.user.access_token = token.access_token;
      }
      return session;
    },

    async jwt({ token, account }) {
      if (account?.access_token) {
        token.access_token = account.access_token;
      }

      return token;
    },
  },
});
