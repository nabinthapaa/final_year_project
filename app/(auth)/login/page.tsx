"use client";
import { signIn, useSession } from "next-auth/react";
import { RedirectType, redirect, useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const loginInputs = [
  {
    label: "Email",
    type: "email",
    id: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    type: "password",
    id: "password",
    placeholder: "Enter your password",
  },
];

function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email: string = e.currentTarget.email.value;
    const password: string = e.currentTarget.password.value;
    const type: string = e.currentTarget.type.value;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        type,
        redirect: false,
      });
      console.log('==========>',res)
      if (res?.ok) router.replace("/profile");
      if (res?.error) {
        alert("Invalid Credentials");
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };

  // if (session) router.replace("/profile");
  return (
    <form
      className="max-w-[650px] min-w-[300px] px-10 mx-auto space-y-4 my-[30px]"
      onSubmit={handleSubmit}
    >
      {loginInputs.map((input) => (
        <React.Fragment key={input.id}>
          <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent">
            <span>{input.label}</span>
            <input
              {...input}
              name={input.id}
              className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
            />
          </label>
        </React.Fragment>
      ))}
      <label
        htmlFor="type"
        className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent"
      >
        Account Type
        <select
          name="type"
          id="type"
          className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
        >
          <option value="user" className="text-teal font-bold">
            User
          </option>
          <option value="doctor" className="text-teal font-bold">
            Doctor
          </option>
        </select>
      </label>
      <button
        type="submit"
        className="px-5 py-4 bg-accent rounded-lg font-bold w-full text-xl"
      >
        Login
      </button>
    </form>
  );
}

export default LoginPage;
