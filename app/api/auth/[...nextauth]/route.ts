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
            try {
              await ConnectToDB();
              const doctor = await Doctor.findOne({ email });
              if (!doctor) return null;
              const passwordMatch = await bcrypt.compare(
                password,
                doctor.password
              );
              if (!passwordMatch) throw new Error("Invalid Credentials");
              const modifiedUser = doctor["_doc"];
              delete modifiedUser.password;

              return { ...modifiedUser, type };
            } catch (error) {
              if (error instanceof Error) {
                return null;
              }
            }
          } else if (type === "user") {
            try {
              await ConnectToDB();
              const user = await User.findOne({ email });
              if (!user) return null;
              console.log("Authorize: ", user);
              const passwordMatch = await bcrypt.compare(
                password,
                user.password
              );
              if (!passwordMatch) throw new Error("Invalid Credentials");

              const modifiedUser = user["_doc"];
              delete modifiedUser.password;

              return { ...modifiedUser, type };
            } catch (error) {
              if (error instanceof Error) {
                console.log(error.message);
                return null;
              }
            }
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
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token.user = {
            ...user,
          };
        }

        return token;
      } catch (error) {
        console.error("JWT Callback Error:", error);
        return token;
      }
    },
    //@ts-ignore
    async session({ session, token, user }) {
      return {
        ...session,
        user: token.user,
        ...token,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
