"use client";
import { FormEvent, useState } from "react";
import {
  INVALID_AGE,
  INVALID_EMAIL,
  PASSWORD_DID_NOT_MATCH,
} from "../Errors/FormErros";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { DoctorFormData } from "../types/FormTypes";
import { AccountForm } from "./AccountForm";
import { DoctorTechnical } from "./DoctorTechnical";
import { PersonalForm } from "./PersonalForm";

const INITIAL_DATA: DoctorFormData = {
  firstName: "",
  lastName: "",
  age: "",
  qualification: "",
  specialization: "",
  department: "",
  experience: "",
  email: "",
  password: "",
  repassword: "",
};

function validateDoctor(data: DoctorFormData) {
  if (Number(data.age) < 22) {
    throw INVALID_AGE;
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
  ) {
    throw INVALID_EMAIL;
  } else if (data.password !== data.repassword) {
    throw PASSWORD_DID_NOT_MATCH;
  }
}

export default function DoctorForm() {
  const [data, setData] = useState(INITIAL_DATA);
  function updateFields(fields: Partial<DoctorFormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <AccountForm key="account" {...data} updateFields={updateFields} />,
      <PersonalForm key="user" {...data} updateFields={updateFields} />,
      <DoctorTechnical key="address" {...data} updateFields={updateFields} />,
    ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    try {
      validateDoctor(data);
      try {
        const res = await fetch("/api/register/doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          alert((await res.json()).message);
        } else {
          alert("Something Went wrong");
        }
      } catch (error) {
        if (error instanceof Error)
          alert(JSON.stringify({ error: error.message }));
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(JSON.stringify({ error: error.message }));
      }
    }
  }

  return (
    <div className="relative border w-fit mx-auto p-6 mt-5 rounded-2xl bg-gray-600 shadow-sm">
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button
              className="bg-accent px-5 py-2 font-bold text-lg rounded-full"
              type="button"
              onClick={back}
            >
              Back
            </button>
          )}
          <button
            className="bg-teal px-5 py-2 font-bold text-lg rounded-full"
            type="submit"
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
