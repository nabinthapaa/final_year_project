import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignOutButton from "./components/SignOutButton";

export default async function Dashboard() {
  console.log("Dashboard: ", await getServerSession(authOptions));
  return (
    <div className="px-10">
      <SignOutButton />
    </div>
  );
}
