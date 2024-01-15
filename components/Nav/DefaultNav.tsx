import Link from "next/link";

export default function DefaultNav() {
  return (
    <div className=" text-accent text-3xl font-bold h-16 flex justify-between items-center border-b-[1px] border-text ">
      <p className="pl-10">
        <Link href={"/"}>DiagnoSmart</Link>
      </p>
      <nav className="list-none text-base  md:flex gap-6 pr-10">
        <li>
          <Link href="/checksymptoms">Check Symptoms</Link>
        </li>
        <li>
          <Link href="#">Consult Doctor</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </nav>
    </div>
  );
}
