import React from "react";
import { PersonalForm } from "./PersonalForm";

function UserForm() {
  return (
    <form className="max-w-[650px] min-w-[300px] px-10 mx-auto space-y-4 my-[30px]">
      <PersonalForm user />
      <button
        type="submit"
        className="px-5 py-4 bg-accent rounded-lg font-bold w-full text-xl"
      >
        Create account
      </button>
    </form>
  );
}

export default UserForm;
