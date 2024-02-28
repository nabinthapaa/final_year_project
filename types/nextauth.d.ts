import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
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
