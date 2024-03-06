import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import MakeAppointment from "./MakeAppointment";
import Appointment from "@/models/Appointment";
import { ConnectToDB } from "@/libs/connectToDB";

async function checkAppoinment(id: string): Promise<boolean> {
    "use server";
    ConnectToDB();
    const appointment = await Appointment.find({ user: id, status: "booked" }).lean();
    console.log(appointment, new Date().toTimeString())
    if (appointment.length !== 0) return true;
    else return false;
};

export const fetchCache = 'force-no-store';

export default async function page({
    searchParams: { id },
}: {
    searchParams: { id: string | string[] | undefined };
}) {

    const session = await getServerSession(authOptions);
    if (!session) redirect("/");

    if (session?.user?.type === "doctor") redirect("/appointments");
    //@ts-ignore
    const is_appointment_present = await checkAppoinment(session.user._id);
    console.log("IS APPOINTMENT MADE: ", is_appointment_present);
    if (is_appointment_present) redirect("/my-appointment")

    else {
        const res = await fetch(
            `${process.env.BASE_URL}/api/make-appointment?id=${id}`
        );

        const { data } = await res.json();


        return <MakeAppointment doctor={data} />;
    }
}
