import React from "react";
import DoctorCard from "./components/DoctorCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function SuggestedDoctor({
    searchParams: { dept },
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerSession(authOptions);

    const res = await fetch(
        `${process.env.BASE_URL}/api/doctors/suggestion?dept=${dept}`, { cache: 'no-store' }
    );
    const { data } = await res.json();

    if (session?.user.type === "doctor") redirect("/profile");

    // If no doctors with that specialization are found
    if (!data || data.length <= 0)
        return (
            <div className="container mt-10 mx-auto font-bold text-3xl text-text">
                No <span className="text-accent">{dept}</span> found
            </div>
        );

    return (
        <div className="text-white container mx-auto mt-6">
            <h1 className="font-bold text-3xl mb-6">
                Suggested <span className="text-accent">{dept}</span>:
            </h1>
            <div className="flex flex-wrap gap-4 pb-10">
                {data.map((doctor: any) => (
                    <DoctorCard key={doctor._id} data={doctor} />
                ))}
            </div>
        </div>
    );
}

export default SuggestedDoctor;
