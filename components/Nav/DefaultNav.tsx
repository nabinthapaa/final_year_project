"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function DefaultNav() {
  const { data: session } = useSession();
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
          <Link href="#">Consult Doctor</Link>
        </li>
        {!session?.user ? (
          <li>
            <Link href="/login">Login</Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="" onClick={() => signOut()}>
                Log out
              </Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </>
        )}
      </nav>
    </div>
  );
}
