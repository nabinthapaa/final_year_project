"use client";

import { signOut } from "next-auth/react";

import React from "react";

function SignOutButton() {
  return (
    <button
      className="bg-red-400 px-5 py-2 rounded-lg block"
      onClick={() => signOut()}
    >
      logout
    </button>
  );
}

export default SignOutButton;
