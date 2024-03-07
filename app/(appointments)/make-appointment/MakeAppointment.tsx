"use client";
import { FormWrapper } from "@/app/(auth)/signup/[type]/components/FormWrapper";
import GlassCard from "@/app/(auth)/signup/[type]/components/GlassCard";
import Loader from "@/components/Loader";
import { getDate } from "@/libs/getDate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function MakeAppointment({ doctor }: any) {
    const { data: session } = useSession();
    const [time, setTime] = useState(getDate());
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const symptoms = JSON.parse(document.cookie.split("; ").find(row => row.startsWith("symptoms="))?.split("=")[1] || "")
        const suspectedDisease = document.cookie.split("; ").find(row => row.startsWith("suspectedDisease="))?.split("=")[1] || ""
        try {
            setLoading(true)
            const res = await fetch("/api/make-appointment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    meetingTime: time,
                    doctor: doctor._id,
                    user: session.id,
                    symptoms,
                    suspectedDisease
                }),
            });

            if (res.ok){
                alert("Appointment  succesfully booked");
                router.replace("/my-appointment");
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <FormWrapper>
            <GlassCard>
                <form onSubmit={handleSubmit} className="py-6 space-y-10">
                    <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-primary">
                        <span>Doctor</span>
                        <input
                            id="appointment_date"
                            name="appointment_date"
                            value={doctor.name}
                            readOnly
                            className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
                        />
                    </label>
                    <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-primary">
                        <span>Select Appointment Date</span>
                        <input
                            id="appointment_date"
                            name="appointment_date"
                            type="date"
                            required
                            value={time}
                            min={getDate(new Date().toDateString())}
                            onChange={(e) => setTime(e.target.value)}
                            className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-teal w-full px-10 py-2 font-bold text-lg rounded-md disabled:opacity-50 disabled:grid disabled:grid-cols-[0.3fr,1fr] content-center"
                        disabled={loading}
                    >
                        {loading && <div className="relative">
                            <Loader />
                        </div>}
                        <span className="">{loading ? "Making appointment..." : "Make Appointment"}</span>
                    </button>
                </form>
            </GlassCard>
        </FormWrapper>
    );
}
