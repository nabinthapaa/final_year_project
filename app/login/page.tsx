"use client";
import React from "react";

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
  return (
    <form
      className="max-w-[650px] min-w-[300px] px-10 mx-auto space-y-4 my-[30px]"
      method="post"
      action="/login"
    >
      {loginInputs.map((input) => (
        <>
          <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent">
            <span>{input.label}</span>
            <input
              {...input}
              name={input.id}
              className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
            />
          </label>
        </>
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
