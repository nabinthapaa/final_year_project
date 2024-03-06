import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DoctorCard from "@/app/suggested-doctor/components/DoctorCard";
import { getDate } from "@/libs/getDate";
import { parseDate } from "@/libs/parseDate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
    const session = await getServerSession(authOptions);
    const res = await fetch(
        `${process.env.BASE_URL}/api/user-appointment?id=${session.id}`,
        { cache: 'no-store' }
    );
    const { data } = await res.json();
    console.log("User Appointment: ", data);

    if (session && session.doctor) {
        redirect("/appointments");
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mt-10 text-text">
                My Appointment
            </h1>
            {!data ? (
                <p className="text-2xl text-center container font-bold text-text">
                    No Appointments Found
                </p>
            ) : (
                <div className="text-text ">
                    <DoctorCard data={data.doctor} showAppointment={false} />
                    <p className="mt-4">
                        <span className="font-bold">Appointment Date: </span>
                        {parseDate(getDate(data.meetingTime))}
                    </p>
                </div>
            )}
        </div>
    );
}
