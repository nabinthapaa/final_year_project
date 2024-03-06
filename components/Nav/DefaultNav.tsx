"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DoctorNav from "./DoctorNav";
import UserNav from "./UserNav";

export default function DefaultNav() {
  const { data: session } = useSession();
  if (session?.user) {
    return <UserNav session={session} />;
  } else if (session?.doctor) {
    return <DoctorNav session={session} />;
  } else {
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
            <Link href="/consult-doctor">Consult Doctor</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </nav>
      </div>
    );
  }
}
