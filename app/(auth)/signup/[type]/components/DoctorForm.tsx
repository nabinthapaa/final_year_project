"use client";
import {redirect, useRouter} from "next/navigation";
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
import axios from "axios";

const INITIAL_DATA: DoctorFormData = {
  firstName: "",
  lastName: "",
  age: "",
  qualification: "",
  specialization: "",
  experience: "",
  email: "",
  password: "",
  repassword: "",
  image: null,
  gender: "male",
  address: "",
  hospital: "",
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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
    if (!isLastStep) return next();
    try {
      setLoading(true);
      validateDoctor(data);
      try {
        const res = await axios.post("/api/register/doctor", data);
        if (res.status === 200) {
          router.replace("/login");
        }else if(res.status === 200){
          router.replace("/login");
          alert('Verification from Admin is required')
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
    } finally {
      setLoading(false);
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
        >
          <p>Step 1</p>
          <p className="font-bold text-md">Set up credentials</p>
        </div>
        <div
          className={`${
            currentStepIndex === 1 ? "bg-accent/30 border-white border" : null
          } px-5 rounded-xl py-2`}
        >
          <p>Step 2</p>
          <p className="font-bold text-md">Enter Info</p>
        </div>
        <div
          className={`${
            currentStepIndex === 2 ? "bg-gray-50/30 border-white border" : null
          } px-5 rounded-xl py-2`}
        >
          <p>Step 3</p>
          <p className="font-bold text-md">Enter Legal Info</p>
        </div>{" "}
        <div
          className={`${
            currentStepIndex === 3 ? "bg-gray-50/30 border-white border" : null
          } px-5 rounded-xl py-2`}
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
              className="bg-accent px-10 py-2 font-bold text-lg rounded-full disabled:opacity-50"
              type="button"
              onClick={back}
              disabled={loading}
            >
              Back
            </button>
          )}
          <button
            className="bg-teal px-10 py-2 font-bold text-lg rounded-full disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
