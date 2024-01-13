"use client";
import {
  useDoctorFormContext,
  useUpdateFormContext,
} from "@/context/DoctorFormContext";
import React, { FormEvent, MouseEvent, useState } from "react";
import { DoctorTechnical } from "./DoctorTechnical";
import { PersonalForm } from "./PersonalForm";

export default function DoctorForm() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const updateForm: any = useUpdateFormContext();
  const formValues: any = useDoctorFormContext();

  const updateFormData = (element: HTMLElement) => {
    //@ts-ignore
    const formData = new FormData(element);
    formData.forEach((value, key) => {
      updateForm(key, value);
    });
  };

  const handleNext = (e: MouseEvent<HTMLElement>) => {
    //@ts-ignore
    updateFormData(e.currentTarget.parentElement);
    setCurrentPage((page) => page + 1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateFormData(e.currentTarget);
    if (formValues["password"] !== formValues["repassword"]) {
      setCurrentPage(1);
      alert("Password did not match");
    } else if (
      new Date().getFullYear() - new Date(formValues["dob"]).getFullYear() <
      22
    ) {
      setCurrentPage(1);
      alert("Enter a valid age range");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formValues["email"]
      )
    ) {
      setCurrentPage(1);
      alert("enter a valid email address");
    }
  };

  return (
    <>
      <section className="mx-auto min-w-[300px] max-w-[650px] mt-5 flex items-center gap-4">
        <hr className="inline-block w-12 border-teal" />
        <span
          className={`border rounded-full p-4 border-text aspect-square w-10 h-10 text-center flex items-center font-bold ${
            currentPage === 1 ? "bg-accent" : "bg-teal"
          } text-text`}
        >
          1
        </span>
        <hr className="inline-block flex-1 border-teal" />
        <span
          className={`border rounded-full p-4 border-text aspect-square w-10 h-10 text-center flex items-center font-bold ${
            currentPage === 2 ? "bg-accent" : null
          }`}
        >
          2
        </span>
        <hr className="inline-block w-12 border-teal" />
      </section>
      <form
        onSubmit={handleSubmit}
        className="max-w-[650px] min-w-[300px] px-10 mx-auto space-y-4 my-[30px]"
      >
        {currentPage === 1 ? <PersonalForm doctor /> : <DoctorTechnical />}
        {currentPage === 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-4 bg-accent rounded-lg font-bold w-full text-xl text-center"
          >
            Next
          </button>
        ) : (
          <div className="flex gap-4 justify-between items-center flex-wrap">
            <button
              onClick={() => {
                setCurrentPage((page) => page - 1);
              }}
              className="px-5 py-4 bg-teal rounded-lg font-bold text-xl flex-1"
            >
              Go Back
            </button>
            <button
              type="submit"
              className="px-5 py-4 bg-accent rounded-lg font-bold flex-1 text-xl"
            >
              Create Account
            </button>
          </div>
        )}
      </form>
    </>
  );
}
