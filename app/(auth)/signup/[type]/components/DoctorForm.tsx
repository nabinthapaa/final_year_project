"use client";
import { FormEvent, useState } from "react";
import {
  INVALID_AGE,
  INVALID_EMAIL,
  PASSWORD_DID_NOT_MATCH,
} from "../Errors/FormErros";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { DoctorDocs, DoctorFormData } from "../types/FormTypes";
import { AccountForm } from "./AccountForm";
import DocotorDocs from "./DocotorDocs";
import { DoctorTechnical } from "./DoctorTechnical";
import { PersonalForm } from "./PersonalForm";

const INITIAL_DATA: DoctorFormData = {
  firstName: "John",
  lastName: "Watson",
  age: "45",
  qualification: "MBBS",
  specialization: "Neurologist",
  department: "Cardio",
  experience: "10",
  email: "johna@gmail.com",
  password: "123123",
  repassword: "123123",
  image: null,
  gender: "male",
  address: "kali",
  hospital: "123123",
  docs: {
    citizenship: undefined,
    citizenship_id: null,
    nmc_no: undefined,
    nmc_certificate: null,
  },
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

  function updateDocs(fields: Partial<DoctorDocs>) {
    setData((prev) => {
      return {
        ...prev,
        docs: {
          ...prev.docs,
          ...fields,
        },
      };
    });
  }

  const { goTo, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <AccountForm key="account" {...data} updateFields={updateFields} />,
      <PersonalForm key="user" {...data} updateFields={updateFields} />,
      <DocotorDocs key="docs" {...data.docs} updateFields={updateDocs} />,
      <DoctorTechnical key="address" {...data} updateFields={updateFields} />,
    ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(data);
    if (!isLastStep) return next();
    try {
      validateDoctor(data);
      try {
        const formData = new FormData();
        const { image, docs, ...otherdata } = data;
        const { citizenship_id, nmc_certificate, ...otherdocs } = docs;
        if (citizenship_id) formData.set("citizenship_id", citizenship_id);
        if (nmc_certificate) formData.set("nmc_certificate", nmc_certificate);
        if (data.image) formData.set("image", data.image);
        formData.set("otherinfo", JSON.stringify({ ...otherdata }));
        formData.set("otherdocs", JSON.stringify({ ...otherdocs }));
        const res = await fetch("/api/register/doctor", {
          method: "POST",
          body: formData,
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
    <div className="relative border gap-4 w-fit  mx-auto p-6 mt-5 rounded-2xl glasscard shadow-sm grid grid-cols-[0.2fr,1fr]">
      <div
        className={`w-52 h-full pt-16 px-2 rounded-md shadow-gray-600  space-y-6`}
      >
        <div
          className={`${
            currentStepIndex === 0
              ? "bg-accent/30 border-white border shadow-custom"
              : null
          } px-5 rounded-xl py-2`}
          onClick={() => goTo(0)}
        >
          <p>Step 1</p>
          <p className="font-bold text-md">Set up credentials</p>
        </div>
        <div
          className={`${
            currentStepIndex === 1 ? "bg-accent/30 border-white border" : null
          } px-5 rounded-xl py-2`}
          onClick={() => goTo(1)}
        >
          <p>Step 2</p>
          <p className="font-bold text-md">Enter Info</p>
        </div>
        <div
          className={`${
            currentStepIndex === 2 ? "bg-gray-50/30 border-white border" : null
          } px-5 rounded-xl py-2`}
          onClick={() => goTo(2)}
        >
          <p>Step 3</p>
          <p className="font-bold text-md">Enter Legal Info</p>
        </div>{" "}
        <div
          className={`${
            currentStepIndex === 3 ? "bg-gray-50/30 border-white border" : null
          } px-5 rounded-xl py-2`}
          onClick={() => goTo(3)}
        >
          <p>Step 4</p>
          <p className="font-bold text-md">Enter Work Info</p>
        </div>
      </div>
      <form onSubmit={onSubmit}>
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
              className="bg-accent px-10 py-2 font-bold text-lg rounded-full"
              type="button"
              onClick={back}
            >
              Back
            </button>
          )}
          <button
            className="bg-teal px-10 py-2 font-bold text-lg rounded-full"
            type="submit"
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
