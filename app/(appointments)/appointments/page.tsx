import { getDate } from "@/libs/getDate";
import { parseDate } from "@/libs/parseDate";
import { printRelativeTime } from "@/libs/relativeTime";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";

async function page() {

    const session = await getServerSession(authOptions);
    const res = await fetch(
        `${process.env.BASE_URL}/api/doctor-appointment?id=${session.id}`
    );

    const { data } = await res.json();
    if (session && session.user !== undefined) {
        redirect("/my-appointment");
    }

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-text font-bold text-3xl text-center">Appointments</h1>
            { (data.length === 0 || !data) && <p className="text-center font-bold text-text text-lg">No appoiments at the moment</p>}
            <div className="mt-4 flex flex-wrap gap-6">
                {data.map((d: any) => {
                    return (
                        <div
                            key={d._id}
                            className="rounded-lg min-w-[300px] min-h[800px] w-fit flex flex-col items-center justify-center py-5 border-accent border-2 px-4 text-text"
                        >
                            <div className="relative w-[80%] h-48 rounded-md overflow-hidden">
                                <Image
                                    src={d.user.image || "/image 1.png"}
                                    alt={d.user.firstName}
                                    fill
                                />
                            </div>
                            <div className="pt-4 text-center">
                                <h2 className="font-bold text-xl">
                                    {d.user.firstName + " " + d.user.lastName}{" "}
                                    <span className="font-normal opacity-60 ">
                    ({d.user.age})
                  </span>
                                </h2>
                                <p className="opacity-70 text-sm">{data.address}</p>
                            </div>
                            <div className="contact mt-5 opacity-90 text-center">
                                <Link href={`mailto:${d.user.email}`}>
                                    <span className="font-bold text-lg">&#9993; </span>
                                    {d.user.email}
                                </Link>
                                <p className="opacity-60">
                                    booked {printRelativeTime(d.createdAt)}
                                </p>
                                <p className="opacity-60">
                  <span className="block font-bold opacity-100 text-text">
                    Appointment Date
                  </span>{" "}
                                    {parseDate(getDate(d.meetingTime))}
                                </p>
                                <div className="w-[80%] h-[20px] mt-4">
                                    <Link href={`/appointments/view-more?id=${d._id}`} className="bg-accent text-text text-bold px-4 py-2"> View More </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default page;
