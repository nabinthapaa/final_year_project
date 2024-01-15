"use client";
import Remove from "@/utils/remove";
import { symptoms } from "@/utils/symptoms";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Select from "react-select";
import Prediction from "./components/Prediction";

interface ISymptoms {
  value: string;
  label: string;
}

export default function CheckSymptoms() {
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState<ISymptoms[]>([]);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{} | undefined>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // POST the selected data to the server and get response
    if (session) {
      setName(`${session.user.firstName} ${session.user.lastName}`);
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setResult({
      percentage: "60%",
      diseases: "Malaria",
      department: "General",
    });
    setLoading(false);
  };

  return (
    <>
      <form
        className="mx-10 mt-10 w-fit h-fit max-w-[60vw] min-w-[20vw] space-y-4"
        onSubmit={handleSubmit}
      >
        {!session && (
          <label className="space-y-2 font-bold text-2xl flex flex-col items-left text-accent">
            <span>Name</span>
            <input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-lg bg-text/0 px-2 py-3 outline-accent outline-2 border border-accent focus:outline-4 focus:border-0 text-lg text-text"
            />
          </label>
        )}
        <label className="space-y-6 font-bold text-2xl flex flex-col items-left text-accent">
          Select symptoms below
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
            className="text-xl font-semibold mt-2"
          />
        </label>
        <button
          className="bg-teal px-10 font-bold py-2 rounded-full mt-5 disabled:bg-teal/30"
          type="submit"
          disabled={loading}
        >
          Predict
        </button>
      </form>
      <div
        className={`${
          result ? "opacity-100" : "translate-x-[-100vw] opacity-0"
        } transition-all`}
      >
        <Prediction name={name} {...result} />
      </div>
    </>
  );
}
