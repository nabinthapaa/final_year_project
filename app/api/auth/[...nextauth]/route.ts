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
              const doctor = await Doctor.findOne({ email }).lean();
              //@ts-ignore
              if(!doctor?.verified) throw new Error("Pending Verification");
              if (!doctor) return null;
              const passwordMatch = await bcrypt.compare(
                password,
                //@ts-ignore
                doctor.password
              );
              if (!passwordMatch) throw new Error("Password Did not Match");
              //@ts-ignore
              delete doctor.password;
              delete doctor.image;

              return { ...doctor, type };
            } catch (error) {
              if (error instanceof Error) {
                return null;
              }
            }
          } else if (type === "user") {
            try {
              await ConnectToDB();
              const user = await User.findOne({ email }).lean();
              if (!user) return null;
              const passwordMatch = await bcrypt.compare(
                password,
                //@ts-ignore
                user.password
              );
              if (!passwordMatch) throw new Error("Invalid Credentials authorization");

              //@ts-ignore
              delete user.password;
              delete user.image;

              return { ...user, type };
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
        if (user && user.type === 'user') {
            token.user = {
              id: user.userId,
              type: user.type,
              obj: user._id
            }
            token.id = user._id
          }else if(user && user.type === 'doctor'){
            token.doctor = {
              id: user.doctorId,
              type: user.type,
              obj: user._id
            }
            token.id = user._id
          }
        console.log('token',token)
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
        doctor: token.doctor,
        id: token.id
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
