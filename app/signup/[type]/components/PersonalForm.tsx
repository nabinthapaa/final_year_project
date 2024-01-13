import { PersonalInputs } from "@/utils/PersonalField";
import React from "react";
import { Input } from "./Input";
export function PersonalForm({
  user,
  doctor,
}: {
  user?: boolean;
  doctor?: boolean;
}) {
  return user ? (
    PersonalInputs.map((input) => {
      return (
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
      );
    })
  ) : doctor ? (
    <>
      {PersonalInputs.map((input) => {
        return <Input key={input.id} {...input} />;
      })}
    </>
  ) : null;
}
