import { INVALID_AGE } from "@/app/signup/[type]/Errors/FormErros";
import { ConnectToDB } from "@/libs/connectToDB";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {},

      //@ts-ignore
      async authorize(credentials) {
        //@ts-ignore
        const { email, password, type } = credentials;
        try {
          if (type === "doctor") {
            await ConnectToDB();
            const doctor = await Doctor.findOne({ email });
            if (!doctor) return null;
            const passwordMatch = await bcrypt.compare(
              password,
              doctor.password
            );
            if (!passwordMatch) throw new Error("Invalid Credentials");
            return doctor;
          } else if (type === "user") {
            await ConnectToDB();
            const user = await User.findOne({ email });
            if (!user) return null;
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) throw new Error("Invalid Credentials");
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof Error) {
            return error.message;
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
