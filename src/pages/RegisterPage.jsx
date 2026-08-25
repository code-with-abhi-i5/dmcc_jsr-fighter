import React, { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import SuccessScreen from "../components/SuccessScreen";
import bannerImg from "../assets/banner.png";
import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [successId, setSuccessId] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleSuccess = (id, name) => {
    setSuccessId(id);
    setPlayerName(name);
  };

  if (successId) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-slate-50 to-slate-50 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-lg">
          <SuccessScreen
            registrationId={successId}
            playerName={playerName}
            onReset={() => {
              setSuccessId(null);
              setPlayerName("");
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-900">
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-slate-50 to-slate-50 pointer-events-none" />
      
      <main className="relative z-10 max-w-3xl mx-auto min-h-screen flex flex-col pb-16">
        <div className="w-full flex justify-center pt-0 sm:pt-6 pb-10">
          <div className="relative w-full max-w-2xl sm:rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
            <img
              src={bannerImg}
              alt="JSR Fighter DMCC Jharkhand Premier League"
              className="w-full h-auto object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            <div className="absolute top-3 right-3 z-20">
              <button 
                onClick={() => navigate("/track")}
                className="bg-white/90 backdrop-blur-md border border-slate-200 text-emerald-600 hover:bg-emerald-50 px-4 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex items-center gap-2 shadow-md"
              >
                <Activity className="w-4 h-4" />
                Track Status
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight">
            Player Registration
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Join the biggest cricket tournament of the year</p>
        </div>

        <div className="flex-1 px-4 sm:px-8 max-w-2xl mx-auto w-full">
          <RegistrationForm onSuccess={handleSuccess} />
        </div>
      </main>
    </div>
  );
}
