import React from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Activity } from "lucide-react";
import heroDesktop from "../assets/hero.png";
import heroMobile from "../assets/mobilehero.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black relative flex flex-col font-sans overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt="JSR Fighter DMCC"
            className="w-full h-full object-cover sm:object-cover object-top opacity-90"
          />
        </picture>
        {/* Gradient overlay to ensure text/buttons are visible at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end flex-1 w-full max-w-4xl mx-auto px-4 pb-12 sm:pb-24">
        
        <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-center animate-fade-in-up">
          <button
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto min-w-[220px] bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl text-lg font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1"
          >
            <UserPlus className="w-6 h-6" />
            Register Now
          </button>

          <button
            onClick={() => navigate("/track")}
            className="w-full sm:w-auto min-w-[220px] bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl text-lg font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:-translate-y-1"
          >
            <Activity className="w-6 h-6" />
            Track Status
          </button>
        </div>

      </div>
    </div>
  );
}
