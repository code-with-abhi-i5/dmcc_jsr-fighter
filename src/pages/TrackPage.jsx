import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, User, Hash, Clock, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { trackRegistration } from "../services/registration";
import bannerImg from "../assets/banner.png";

export default function TrackPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registrationId: "",
    playerName: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!formData.registrationId || !formData.playerName) {
      toast.error("Please fill both fields");
      return;
    }

    setIsSearching(true);
    try {
      const data = await trackRegistration(formData.registrationId, formData.playerName);
      if (data) {
        setResult(data);
        toast.success("Registration Found!");
      } else {
        toast.error("Invalid ID or Name");
        setResult(null);
      }
    } catch (error) {
      toast.error(error.message || "Failed to search");
      setResult(null);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved': 
        return { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: <CheckCircle className="w-6 h-6" /> };
      case 'rejected': 
        return { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: <XCircle className="w-6 h-6" /> };
      default: 
        return { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: <Clock className="w-6 h-6" /> };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans text-slate-900">
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/40 via-slate-50 to-slate-50 pointer-events-none" />

      <main className="relative z-10 max-w-2xl mx-auto min-h-screen flex flex-col pb-16 pt-0 sm:pt-6 px-4">
        
        {/* Banner with Back Button */}
        <div className="relative w-full sm:rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white mb-10">
          <img
            src={bannerImg}
            alt="JSR Fighter"
            className="w-full h-auto object-cover"
          />
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 p-2.5 rounded-xl transition-all duration-300 shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight text-center mb-8">
          Track Your Status
        </h1>

        <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-xl relative">
          <form onSubmit={handleSearch} className="space-y-5 relative z-10">
            <Input
              label="Registration ID"
              id="registrationId"
              placeholder="e.g. DMCC-01"
              icon={Hash}
              value={formData.registrationId}
              onChange={(e) => setFormData({...formData, registrationId: e.target.value})}
            />
            <Input
              label="Player Name"
              id="playerName"
              placeholder="Exactly as registered"
              icon={User}
              value={formData.playerName}
              onChange={(e) => setFormData({...formData, playerName: e.target.value})}
            />
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                loading={isSearching}
              >
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Registration
                </div>
              </Button>
            </div>
          </form>
        </div>

        {/* Status Result Card */}
        {result && (() => {
          const statusConfig = getStatusConfig(result.status);
          return (
            <div className="mt-8 animate-fade-in">
              <div className={`rounded-3xl p-6 sm:p-8 bg-white border shadow-xl ${statusConfig.border}`}>
                <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                  {/* Photo */}
                  <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-md bg-slate-50">
                    <img
                      src={result.playerPhotoUrl}
                      alt={result.playerName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-slate-800 tracking-wide mb-1">
                      {result.playerName}
                    </h3>
                    <p className="text-slate-500 font-semibold tracking-wide text-sm mb-4">
                      ID: <span className="text-slate-800">{result.registrationId}</span> &bull; JERSEY: <span className="text-emerald-600">#{result.jerseyNumber} ({result.jerseySize})</span>
                    </p>
                    
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-bold tracking-wide capitalize text-lg ${statusConfig.color} ${statusConfig.bg} ${statusConfig.border}`}>
                      {statusConfig.icon}
                      {result.status}
                    </div>
                    
                    {result.adminMark && (
                      <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200 text-left">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Admin Remarks</p>
                        <p className="text-slate-700 font-medium text-sm leading-relaxed">{result.adminMark}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </main>
    </div>
  );
}
