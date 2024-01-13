import React, { ReactNode } from "react";

export default function GlassCard({ children }: { children: ReactNode }) {
  return (
    <div className="h-72 w-72 backdrop-blur-sm rounded-3xl border border-text bg-text/20 font-bold text-2xl py-4 text-text hover:scale-105 transition-all hover:border-4">
      {children}
    </div>
  );
}
