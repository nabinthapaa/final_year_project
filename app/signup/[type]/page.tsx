import { DoctorFormContextProvider } from "@/context/DoctorFormContext";
import React from "react";
import DoctorForm from "./components/DoctorForm";
import { PersonalForm } from "./components/PersonalForm";
import UserForm from "./components/UserForm";

export default function SignUpForm({ params }: { params: { type: string } }) {
  return params.type.toLowerCase() === "doctor" ? (
    <DoctorFormContextProvider>
      <DoctorForm />
    </DoctorFormContextProvider>
  ) : params.type.toLowerCase() === "user" ? (
    <UserForm />
  ) : (
    "Could not find the specifies route"
  );
}
