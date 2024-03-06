import Image from "next/image";
import Link from "next/link";
import Loading from "@/app/loading";

export default function Home() {
  // return <Loading/>
  return (
    <>
      <div className="px-10 pt-24">
        <div className="grid grid-cols-2">
          <div className="text-text">
            <h1 className="font-bold text-[50px]">
              Welcome to <span className="text-accent">DiagnoSmart</span>
            </h1>
            <p className="text-xl">
              Examine <span className="text-accent">symptoms</span> from the
              comfort of your home
            </p>
            <div className="mt-20">
              <Link
                href={"/signup"}
                className="cursor-pointer bg-accent px-10 py-5 rounded-full text-2xl font-bold text-center drop-shadow-[drop-shadow(0px 10px 40px rgba(0, 0, 0, 0.25));]"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="place-self-end rounded-lg overflow-hidden">
            <Image
              src="/image 1.png"
              alt="Hospital Image"
              height={600}
              width={600}
            />
          </div>
        </div>

        <hr className="mt-10 rounded-full border-b-2 border-teal" />
        <div className="text-text font-md mt-10 space-y-6">
          <p className="text-[#f00] font-bold text-3xl">
            Important Disclaimer:
          </p>
          <p className="text-xl">
            This system provides assistance but does not guarantee 100% accuracy
            in disease predictions.{" "}
            <span className="text-accent block">
              Consult a healtcare professional for accurate medical advice
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
