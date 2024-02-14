import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProfileCard from "./components/ProfileCard";

async function Profile() {
  const session = await getServerSession(authOptions);
  return (
    <div className="text-white">
      <ProfileCard data={session?.user} />
    </div>
  );
}

export default Profile;
