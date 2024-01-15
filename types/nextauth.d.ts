import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      lastName?: string;
      age?: number;
      firstName?: string;
    } & DefaultSession["user"];
  }
  interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    createdAt?: string;
    updatedAt?: string;
    type?: string;
  }
}
