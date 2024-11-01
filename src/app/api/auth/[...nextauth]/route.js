import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
require("dotenv").config({ path: __dirname + "\\.env" });

const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials;
        if (username == "fame" && password == "1234") {
          return { id: "1", username: username, role: "admin",  };
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role; 
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;  
      session.user.username = token.username; 
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    maxAge: 4 * 60 * 60,
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // page: {
  //   signIn: "/login",
  // }
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
