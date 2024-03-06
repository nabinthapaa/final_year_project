"use client";
import Remove from "@/utils/remove";
import { symptoms } from "@/utils/symptoms";
import { useSession } from "next-auth/react";
import axios from 'axios';
import {FormEvent, useEffect, useState} from "react";
import Select from "react-select";
import Prediction from "./components/Prediction";
import Loader from "@/components/Loader";
import {BASE_URL, PREDICT} from "@/app/api/api-constant/api-const";
import {number} from "prop-types";

interface ISymptoms {
    value: string;
    label: string;
}

function CheckSymptoms() {
    const { data: session } = useSession();
    const [selectedOption, setSelectedOption] = useState<ISymptoms[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{} | undefined>();
    const [data, setData] = useState(null);

    console.log('data',data)

    useEffect(() => {
            const fetchData = async () => {
                try {
                    if (session && session.user) {
                        const userDetail = await axios.get(`/api/user/${session.user.id}`);
                        setData(userDetail.data.data);
                    } else if (session && session.doctor) {
                        const doctorDetail = await axios.get(`/api/doctor/${session.doctor.id}`);
                        setData(doctorDetail.data.data);
                    }
                } catch (error) {
                    console.error('Error fetching user/doctor details:', error);
                }
            };
            fetchData();
        console.log('data---',data)
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('session',session)
        if (session) {
            const symptoms = [];
            for (const s of selectedOption){
                symptoms.push(s.label);
            }
            document.cookie = `symptoms=${JSON.stringify(symptoms)}`;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.set("symptoms", JSON.stringify(selectedOption));
            const res = await axios.post(BASE_URL + PREDICT, formData);
            setResult(res.data);
            document.cookie=`suspectedDisease=${res.data.predicteddisease}`
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Loader show={loading} />
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
                            value={'hello'}
                            onChange={(e) => {}}
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
                className={`${result ? "opacity-100" : "translate-x-[-100vw] opacity-0"
                } transition-all`}
            >
                <Prediction data={data} {...result} />
            </div>
        </>
    );
}


export default CheckSymptoms;
