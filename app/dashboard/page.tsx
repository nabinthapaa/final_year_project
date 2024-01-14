"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";

function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
      {session?.user?.email} <button onClick={() => signOut()}>logout</button>
    </div>
  );
}

export default Dashboard;
