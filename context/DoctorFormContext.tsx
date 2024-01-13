"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

//@ts-ignore
const DoctorFormContext = createContext();
//@ts-ignore
const UpdateFormContext = createContext();

function useDoctorFormContext() {
  return useContext(DoctorFormContext);
}

function useUpdateFormContext() {
  return useContext(UpdateFormContext);
}

function DoctorFormContextProvider({ children }: { children: ReactNode }) {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    age: "",
    phone: "",
    dob: "",
    password: "",
    repassword: "",
    qualification: "",
    specialization: "",
    experience: "",
    department: "",
  });

  const updateForm = (key: string, value: string): void => {
    const update = { [key]: value };
    setFormValues((prev) => ({ ...prev, ...update }));
  };

  return (
    <DoctorFormContext.Provider value={formValues}>
      <UpdateFormContext.Provider value={updateForm}>
        {children}
      </UpdateFormContext.Provider>
    </DoctorFormContext.Provider>
  );
}

export {
  DoctorFormContextProvider,
  useDoctorFormContext,
  useUpdateFormContext,
};
