import Link from "next/link";
import React from "react";

type PredictionProps = {
  name: string;
  confidencescore?: number;
  predicteddisease?: string;
  consultdoctor?: string;
};

export default function Prediction({
  name,
  confidencescore,
  predicteddisease,
  consultdoctor,
}: PredictionProps) {
  return (
    <div className="mt-10 px-10">
      <div className="flex w-full justify-around border-teal border-2 rounded-xl p-10">
        <div className="left text-xl max-w-[600px] py-2 min-w-[300px] w-[600px] font-bold text-text space-y-4 px-2">
          <p>
            Patient Name: <span className="text-accent">{name}</span>
          </p>
          <p>
            Predicted Disease: <span>{predicteddisease}</span>
            <span className="text-sm block">Know more about disease here at {" "}
              <Link
                href={`https://search.nih.gov/search?utf8=%E2%9C%93&affiliate=nih&query=${predicteddisease}`}
                target="_blank"
                className="underline text-blue-300"
              >NIH</Link></span>
          </p>
          <p>
            Specialiazation:{" "}
            <Link href={`/suggested-doctor?dept=${consultdoctor}`}>
              {consultdoctor}
            </Link>
          </p>
          <div className="relative px-2 py-2">
            <div className="absolute left-0 right-0 rounded-full bg-accent inset-0"></div>
            <div
              className={`left-0 top-0 bottom-0 bg-teal absolute rounded-full transition-[width]`}
              style={{
                width: `${confidencescore?.toFixed(2)}%`,
              }}
            ></div>
            <div className="relative px-10">
              Confidence: {confidencescore?.toFixed(2)}%
            </div>
          </div>
        </div>
        <div className="border-r-2 border-r-teal"></div>
        <div className="right self-start text-text text-xl font-bold px-10 space-y-10 py-10">
          <p>
            Please be advised that this system does not claim the accuracy of
            the prediction.
          </p>
          <p>
            Please{" "}
            <span className="text-accent">
              contact the Medical Professional{" "}
            </span>{" "}
            further investigation.
          </p>
        </div>
      </div>
    </div>
  );
}
