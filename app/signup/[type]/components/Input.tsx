"use client";
import { useDoctorFormContext } from "@/context/DoctorFormContext";
import React, { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, value, onChange, ...props }: InputProps) {
  const formValues: any = useDoctorFormContext();
  const [currentValue, setcurrentValue] = useState(() => {
    if (props.id) {
      if (formValues[props.id]) {
        return formValues[props.id];
      } else {
        return "";
      }
    } else {
      return "";
    }
  });
  return (
    <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent">
      <span>{label}</span>
      <input
        {...props}
        name={props.id}
        value={currentValue}
        onChange={(e) => setcurrentValue(e.target.value)}
        className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
      />
    </label>
  );
}
