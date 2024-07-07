import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug:true,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      } else {
        session.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      }
      return session;
    },
    async signIn({ account, profile, user }) {
      const email = user.email as string;
      const already = await prisma.user.findUnique({
        where: { email: email as string },
      });
      if (!already) {
        await prisma.user.create({
          data: {
            email,
            name: user.name,
            image: user.image,
          },
        });
      } else {
        await prisma.user.update({
          where: { email },
          data: {
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});
export { handler as GET, handler as POST };
