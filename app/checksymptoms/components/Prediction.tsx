import React from "react";

export default function Prediction() {
  const percentage = "40%";
  return (
    <div className="mt-10 px-10">
      <div className="flex w-full justify-around border-teal border-2 rounded-xl">
        <div className="left text-xl max-w-[600px] py-2 min-w-[300px]  font-bold text-text space-y-4 px-2">
          <p>
            Patient Name:{" "}
            <span className="text-accent">Ram Bahadur Kunwor</span>
          </p>
          <p>
            Predicted Disease: <span>Malaraia</span>
          </p>
          <p>Department: Dermatologist</p>
          <div className="relative px-2 py-2">
            <div className="absolute left-0 right-0 rounded-full bg-accent inset-0"></div>
            <div
              className={`left-0 top-0 bottom-0 bg-teal absolute rounded-full transition-[width]`}
              style={{
                width: percentage,
              }}
            ></div>
            <div className="relative">Confidence: {percentage}</div>
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
