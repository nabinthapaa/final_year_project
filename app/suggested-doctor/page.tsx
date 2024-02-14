import React from "react";
import DoctorCard from "./components/DoctorCard";

async function SuggestedDoctor({
  searchParams: { dept },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const res = await fetch(
    `${process.env.BASE_URL}/api/doctors/suggestion?dept=${dept}`
  );
  const { data } = await res.json();
  return (
    <div className="text-white container mx-auto mt-6">
      <h1 className="font-bold text-3xl mb-6">
        Suggested Doctors for Department: {dept}
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
