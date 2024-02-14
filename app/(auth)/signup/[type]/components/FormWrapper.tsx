import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
  subtitle?: string;
};

export function FormWrapper({ title, children, subtitle }: FormWrapperProps) {
  return (
    <div>
      <div className="mb-3">
        <h2 className="font-extrabold text text-3xl">{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="grid auto-rows-auto min-w-[300px] max-w-[600px] w-[50vw] mx-auto space-y-6">
        {children}
      </div>
    </div>
  );
}
