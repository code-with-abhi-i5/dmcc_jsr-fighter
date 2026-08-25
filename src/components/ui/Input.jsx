import React from "react";

export default function Input({
  label,
  id,
  type = "text",
  error,
  icon: Icon,
  register,
  ...props
}) {
  return (
    <div className="space-y-1.5 relative z-10">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-700 tracking-wide"
        >
          {label}
          <span className="text-emerald-500 ml-1">*</span>
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-emerald-600 text-slate-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          id={id}
          type={type}
          className={`
            block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-slate-900
            placeholder:text-slate-400 transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-sm
            ${Icon ? "pl-11" : ""}
            ${
              error
                ? "border-red-300 focus:border-red-500 bg-red-50/50"
                : "border-slate-200 focus:border-emerald-500 hover:border-slate-300"
            }
          `}
          {...(register || {})}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-medium">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
