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
  console.log(data);
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
