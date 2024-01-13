import { useDoctorFormContext } from "@/context/DoctorFormContext";
import { TechnicalInputs } from "@/utils/DoctorTechincal";
import { Input } from "./Input";

export function DoctorTechnical() {
  const formValues: any = useDoctorFormContext();

  return (
    <>
      {TechnicalInputs.map((input) => {
        return (
          <Input
            key={input.id}
            {...input}
            value={formValues[input.id]}
            onChange={(e) => e.target.value}
          />
        );
      })}
    </>
  );
}
