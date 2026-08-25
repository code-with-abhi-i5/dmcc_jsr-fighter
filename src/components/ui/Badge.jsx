import React from "react";

const badgeVariants = {
  pending:
    "bg-amber-100 text-amber-800 border border-amber-200",
  approved:
    "bg-emerald-100 text-emerald-800 border border-emerald-200",
  rejected:
    "bg-rose-100 text-rose-800 border border-rose-200",
  info:
    "bg-blue-100 text-blue-800 border border-blue-200",
  default:
    "bg-slate-100 text-slate-700 border border-slate-200",
};

export default function Badge({ variant = "default", children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeVariants[variant] || badgeVariants.default} ${className}`}
    >
      {children}
    </span>
  );
}
