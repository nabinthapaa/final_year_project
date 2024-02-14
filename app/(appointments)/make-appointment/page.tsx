import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import MakeAppointment from "./MakeAppointment";

export default async function page({
  searchParams: { id },
}: {
  searchParams: { id: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.BASE_URL}/api/make-appointment?id=${id}`
  );
  const { data } = await res.json();
  if (session?.user?.type === "doctor") redirect("/");
  return <MakeAppointment doctor={data} />;
}
