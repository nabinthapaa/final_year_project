import { printRelativeTime } from "@/libs/relativeTime";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function DoctorCard({ data, showAppointment = true }: any) {
  return (
    <div className="rounded-lg min-w-[300px] w-fit flex flex-col items-center justify-center py-5 border-accent border-2 px-4">
      <div className="relative w-[80%] h-48 rounded-md overflow-hidden">
        <Image src={data.image || "/image 1.png"} alt={data.name} fill />
      </div>
      <div className="pt-4 text-center">
        <h2 className="font-bold text-xl">
          {data.firstName + " " + data.lastName}{" "}
          <span className="font-normal opacity-60 ">({data.age})</span>
        </h2>
        <p className="opacity-70 text-sm">{data.address}</p>
        <p className="opacity-70">
          <span>{data.qualification}</span> <span>{data.specialization}</span>
        </p>
        <Link
          href={`https://nmc.org.np/searchPractitioner?name=&nmc_no=${
            data.nmc || ""
          }&degree=`}
          target="_blank"
        >
          NMC: {data.nmc || null}
        </Link>
      </div>
      <div className="contact mt-5 opacity-90 text-center">
        <Link href={`mailto:${data.email}`}>
          <span className="font-bold text-lg">&#9993; </span>
          {data.email}
        </Link>
        <p className="opacity-60">joined {printRelativeTime(data.createdAt)}</p>
      </div>
      <div>
        {showAppointment && (
          <Link
            href={`/make-appointment?id=${data._id}`}
            type="submit"
            className="px-6 py-2 bg-accent rounded-lg font-bold w-full text-xl"
          >
            Make Appointment
          </Link>
        )}
      </div>
    </div>
  );
}
