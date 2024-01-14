"use client";
import React, { FormEvent, useState } from "react";
import {
  INVALID_AGE,
  INVALID_EMAIL,
  PASSWORD_DID_NOT_MATCH,
} from "../Errors/FormErros";
import { useMultistepForm } from "../hooks/useMultistepForm";
import { UserFormData } from "../types/FormTypes";
import { AccountForm } from "./AccountForm";
import { PersonalForm } from "./PersonalForm";

const INITIAL_DATA: UserFormData = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  password: "",
  repassword: "",
};

function validateUser(data: UserFormData) {
  if (Number(data.age) < 18) {
    alert("Please enter a valid age");
    throw INVALID_AGE;
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
  ) {
    alert("please enter a valid email");
    throw INVALID_EMAIL;
  } else if (data.password !== data.repassword) {
    throw PASSWORD_DID_NOT_MATCH;
  }
}

function UserForm() {
  const [data, setData] = useState(INITIAL_DATA);
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <AccountForm key="account" {...data} updateFields={updateFields} />,
      <PersonalForm key="user" {...data} updateFields={updateFields} />,
    ]);
  function updateFields(field: Partial<UserFormData>) {
    setData((prev) => ({ ...prev, ...field }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLastStep) return next();
    try {
      validateUser(data);
      try {
        const res = await fetch("/api/register/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          alert("Account Succesfully created");
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
  };
  return (
    <div className="relative border w-fit mx-auto p-6 mt-5 rounded-2xl bg-gray-600 shadow-sm">
      <form onSubmit={handleSubmit}>
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

export default UserForm;
