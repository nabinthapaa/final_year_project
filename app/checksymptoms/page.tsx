"use client";

import Remove from "@/utils/remove";
import { symptoms } from "@/utils/symptoms";
import { FormEvent, useState } from "react";
import Select from "react-select";
import Prediction from "./components/Prediction";

interface ISymptoms {
  value: string;
  label: string;
}

export default function CheckSymptoms() {
  const [selectedOption, setSelectedOption] = useState<ISymptoms[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // POST the selected data to the server and get response
    console.log(selectedOption);
  };

  return (
    <>
      <form
        className="mx-10 mt-10 w-fit h-fit max-w-[60vw] min-w-[20vw]"
        onSubmit={handleSubmit}
      >
        <Select
          components={{
            CrossIcon: Remove,
          }}
          defaultValue={selectedOption}
          isMulti
          options={symptoms}
          onChange={(e) => {
            //@ts-ignore
            setSelectedOption(e);
          }}
          placeholder="Enter and select symptoms here..."
          className="text-xl font-semibold"
        />
        <button
          className="bg-teal px-10 font-bold py-2 rounded-full mt-5"
          type="submit"
        >
          Predict
        </button>
      </form>
      <Prediction />
    </>
  );
}
