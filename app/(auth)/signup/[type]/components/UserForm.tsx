"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
import Loader from "@/components/Loader";

const INITIAL_DATA: UserFormData = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    repassword: "",
    image: null,
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
    const [loading, setloading] = useState(false);
    const router = useRouter();

    const [maxIndex, setMaxIndex] = useState(0);

    const { goTo, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
        useMultistepForm([
            <AccountForm key="account" {...data} updateFields={updateFields} />,
            <PersonalForm key="user" {...data} updateFields={updateFields} />,
        ]);
    function updateFields(field: Partial<UserFormData>) {
        setData((prev) => ({ ...prev, ...field }));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(maxIndex <= currentStepIndex) setMaxIndex(currentStepIndex);
        if (!isLastStep) return next();
        setloading(true);
        try {
            validateUser(data);
            try {
                const formData = new FormData();
                const { image, ...otherdata } = data;
                if (data.image) formData.set("image", data.image);
                formData.set("otherinfo", JSON.stringify({ ...otherdata }));
                const res = await fetch("/api/register/user", {
                    method: "POST",
                    body: formData,
                });
                if (res.ok) {
                    alert("Account Succesfully created");
                    router.replace("/dashboard");
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
            setloading(false);
        }
    };


    const handleSideClick = (index: number) => {
        if(maxIndex >= index) return goTo(index);
        return null;
    }


    return (
        <div className="relative border gap-4 w-fit  mx-auto p-6 mt-5 rounded-2xl glasscard shadow-sm grid grid-cols-[0.2fr,1fr]">
            <div
                className={`w-52 h-full pt-16 px-2 rounded-md shadow-gray-600  space-y-6`}
            >
                <div
                    className={`${currentStepIndex === 0 ? "bg-accent/30 border-white border" : null
                        } px-5 rounded-xl py-2 cursor-pointer`}
                    onClick={() => handleSideClick(0)}
                >
                    <p>Step 1</p>
                    <p className="font-bold text-md">Set up credentials</p>
                </div>
                <div
                    className={`${currentStepIndex === 1 ? "bg-accent/30 border-white border" : null
                        } px-5 rounded-xl py-2 cursor-pointer`}
                    onClick={() => handleSideClick(0)}
                >
                    <p>Step 2</p>
                    <p className="font-bold text-md">Enter Info</p>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
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
                            className="bg-accent px-10 py-2 font-bold text-lg rounded-full disabled:bg-accent/30"
                            type="button"
                            onClick={back}
                            disabled={loading}
                        >
                            Back
                        </button>
                    )}
                    {!isLastStep ? <button
                        className="bg-teal px-10 py-2 font-bold text-lg rounded-full disabled:opacity-50"
                        type="submit"
                        disabled={loading}
                    >
                        Next
                    </button> :
                        <button
                            type="submit"
                            className="bg-teal px-10 py-2 font-bold text-lg rounded-full disabled:opacity-50 disabled:grid disabled:grid-cols-[0.3fr,1fr] content-center"
                            disabled={loading}
                        >
                            {loading && <div className="relative">
                                <Loader />
                            </div>}
                            <span className="">{loading ? "Signing Up.." : "Sign up"}</span>
                        </button>
                    }
                </div>
            </form>
        </div>
    );
}

export default UserForm;
