import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProfileCard({ data }: any) {

  return (
    <div className="profile-card border-accent">
      <div className="profile-image relative w-48 h-48 rounded-full overflow-hidden">
        <Image src={data.image}  alt={data.firstName} fill />
      </div>
      <div className="profile-name">{data.firstName + " " + data.lastName}</div>
      <div className="profile-info">
        <p className="profile-email">{data.email},</p>
        <p className="profile-age">{data.age},</p>
        <p className="profile-address">{data.address}</p>
      </div>
      <div className="profile-view-history">
        <Link
          className="font-bold text-lg px-5 py-2 bg-accent rounded-xl "
          href="/history"
        >
          View History
        </Link>
      </div>
      <div className="profile-view-appointment">
        <Link
          href="/my-appointment"
          className="font-bold text-lg px-5 py-2 bg-accent rounded-xl "
        >
          View Appointment
        </Link>
      </div>
    </div>
  );
}
