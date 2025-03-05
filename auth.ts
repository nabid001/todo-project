import Google from "next-auth/providers/google";
import NextAuth, { Session } from "next-auth";

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
  ],
  callbacks: {
    async signIn({ user }) {
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
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return true;
    },
    async session({ session, token }: { session: Session }) {
      if (session.user && token.access_token) {
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
