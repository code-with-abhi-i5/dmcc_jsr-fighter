import React from "react";
import { Check, Copy, ArrowRight, Activity } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";

export default function SuccessScreen({ registrationId, playerName, onReset }) {
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationId);
    toast.success("ID copied to clipboard!", {
      style: { background: '#10b981', color: '#fff', border: 'none' },
      iconTheme: { primary: '#fff', secondary: '#10b981' },
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center w-full relative overflow-hidden shadow-2xl">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mx-auto w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping" />
          <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)]">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-800 mb-2 tracking-tight">
          Registration Complete!
        </h2>
        <p className="text-slate-600 text-lg mb-1 font-medium">
          Congratulations, <span className="text-emerald-600 font-bold">{playerName}</span>!
        </p>
        <p className="text-slate-500 text-sm mb-8">
          Your application has been successfully submitted.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 shadow-inner">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
            Your Player ID
          </p>
          <div className="flex items-center justify-center gap-3">
            <code className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-wider">
              {registrationId}
            </code>
            <button
              onClick={handleCopy}
              className="p-2.5 bg-white hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-xl transition-all duration-200 border border-slate-200 hover:border-emerald-300 shadow-sm"
              title="Copy ID"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-3">
            * Please save this ID to track your status later
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => navigate("/track")} variant="primary" className="flex-1 w-full text-base">
            <div className="flex items-center justify-center gap-2 w-full">
              Track Status
              <Activity className="w-5 h-5" />
            </div>
          </Button>
          <Button onClick={onReset} variant="secondary" className="flex-1 w-full text-base">
            <div className="flex items-center justify-center gap-2 w-full">
              Register New
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
