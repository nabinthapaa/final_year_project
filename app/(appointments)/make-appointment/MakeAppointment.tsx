"use client";
import { FormWrapper } from "@/app/(auth)/signup/[type]/components/FormWrapper";
import GlassCard from "@/app/(auth)/signup/[type]/components/GlassCard";
import { getDate } from "@/libs/getDate";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function MakeAppointment({ doctor }: any) {
  const { data: session } = useSession();
  const [time, setTime] = useState(getDate());

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/make-appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meetingTime: time,
          doctor: doctor._id,
          user: session?.user._id,
        }),
      });
      if (res.ok) redirect("/my-appointments");
    } catch (error) {}
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
              onChange={(e) => setTime(e.target.value)}
              className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
            />
          </label>
          <button
            type="submit"
            className="px-5 py-4 bg-accent rounded-lg font-bold w-full text-xl"
          >
            Submit
          </button>
        </form>
      </GlassCard>
    </FormWrapper>
  );
}
