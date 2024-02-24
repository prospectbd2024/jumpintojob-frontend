import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler =  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Customize user object with additional data (optional)
      return user;
    },
    async session({ session, user }) {
      // Add user data to session if needed
      session.user = user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET // Replace with a secure secret
});

export {handler as GET, handler as POST}