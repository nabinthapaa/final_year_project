import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function UserNav({ session }: any) {
  return (
    <div className=" text-accent text-3xl font-bold h-16 flex justify-between items-center border-b-[1px] border-text ">
      <p className="pl-10">
        <Link href={"/"}>DiagnoSmart</Link>
      </p>
      <nav className="list-none text-base  md:flex gap-6 pr-10">
        <li>
          <Link href="/checksymptoms">Check Symptoms</Link>
        </li>
        <li>
          <Link href="#/consultDoctor">Consult Doctor</Link>
        </li>
        {!session?.user ? (
          <li>
            <Link href="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link className="text-red-600" href="" onClick={() => signOut()}>
                Log out
              </Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
}
