"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import GlassCard from "./[type]/components/GlassCard";

export default function SignUP() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) router.replace("/dashboard");
  return (
    <div className="px-10 mt-[20vh] flex items-center justify-center gap-[10vh]">
      <GlassCard>
        <Link
          href={"/signup/user"}
          className="h-full w-full flex flex-col items-center space-y-3"
        >
          <div className="h-52 w-52 object-contain">
            <Image
              src={"/user.svg"}
              alt="User Image"
              width={300}
              height={300}
            />
          </div>
          <p>User</p>
        </Link>
      </GlassCard>
      <GlassCard>
        <Link
          href={"/signup/doctor"}
          className="h-full w-full flex flex-col items-center space-y-3"
        >
          <div className="h-52 w-52 object-contain">
            <Image
              src={"/doctor.svg"}
              alt="Doctor Image"
              width={300}
              height={300}
            />
          </div>
          <p>Doctor</p>
        </Link>
      </GlassCard>
    </div>
  );
}
