import { RedirectType, redirect } from "next/navigation";
import React from "react";
import DoctorForm from "./components/DoctorForm";
import UserForm from "./components/UserForm";

export default function SignUpForm({ params }: { params: { type: string } }) {
  return (
    <div className="grid place-items-center h-[80vh]">
      {params.type.toLowerCase() === "doctor" ? (
        <DoctorForm />
      ) : params.type.toLowerCase() === "user" ? (
        <UserForm />
      ) : (
        redirect("/", RedirectType.replace)
      )}
    </div>
  );
}
