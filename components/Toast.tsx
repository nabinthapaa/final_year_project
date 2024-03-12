import React from 'react'

export default function Toast({ show, children }: { show: boolean, children: React.ReactNode }) {
  return (
    <div
      className={`${show ? "right-[50px]" : "right-[-500px]"} ease-out transition-all absolute text-white translate-y-[50%] top-[50px] bg-red-400 font-bold rounded-3xl border-4 border-red-600 px-8 py-2`}>
      {children}
    </div>
  )
}
