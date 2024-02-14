import React, { ReactNode } from "react";

export default function GlassCard({ children }: { children: ReactNode }) {
  return <div className="glasscard">{children}</div>;
}
