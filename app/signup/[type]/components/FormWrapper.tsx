import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="font-extrabold text-center text-3xl mb-3">{title}</h2>
      <div className="grid auto-rows-auto w-[50vw] mx-auto space-y-6">
        {children}
      </div>
    </>
  );
}
