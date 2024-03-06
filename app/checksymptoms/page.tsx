"use client";
import Remove from "@/utils/remove";
import { symptoms } from "@/utils/symptoms";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import Select from "react-select";
import Prediction from "./components/Prediction";
import Loader from "@/components/Loader";

interface ISymptoms {
    value: string;
    label: string;
}

export default function CheckSymptoms() {
    const { data: session } = useSession();
    const [selectedOption, setSelectedOption] = useState<ISymptoms[]>([]);
    const [name, setName] = useState<string>(
        session?.user ? `${session?.user?.firstName} ${session?.user.lastName}` : ""
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{} | undefined>();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session) {
            const symptoms = []
            for (const s of selectedOption) {
                symptoms.push(s.label);
            }
            document.cookie = `symptoms=${JSON.stringify(symptoms)}`;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.set("symptoms", JSON.stringify(selectedOption));
            const res = await fetch("/api/diseases", {
                method: "POST",
                body: formData,
            });
            const { data } = await res.json();
            setResult(data);
            document.cookie = `suspectedDisease=${data.predicteddisease}`
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
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
                    type="submit"
                    className="bg-teal px-10 py-2 font-bold text-lg rounded-full disabled:opacity-50 disabled:grid disabled:grid-cols-[0.3fr,1fr] content-center"
                    disabled={loading}
                >
                    {loading && <div className="relative">
                        <Loader />
                    </div>}
                    <span className="">{loading ? "Getting results..." : "Predict"}</span>
                </button>
            </form>
            <div
                className={`${result ? "opacity-100" : "translate-x-[-100vw] opacity-0"
                    } transition-all`}
            >
                <Prediction name={name} {...result} />
            </div>
        </>
    );
}
