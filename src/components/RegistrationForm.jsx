import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, MapPin, Hash, Trophy, Info } from "lucide-react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";
import PhotoUpload from "./PhotoUpload";
import { registrationSchema } from "../utils/validation";
import { uploadToCloudinary } from "../services/cloudinary";
import { checkDuplicatePhone, checkDuplicateJersey, createRegistration } from "../services/registration";
import toast from "react-hot-toast";
import qrCodeImage from "../assets/QRcode.png";

const JERSEY_SIZES = [
  { value: "M", label: "Medium (M)" },
  { value: "L", label: "Large (L)" },
  { value: "XL", label: "Extra Large (XL)" },
  { value: "XXL", label: "Double Extra Large (XXL)" },
  { value: "XXXL", label: "Triple Extra Large (XXXL)" },
];

const PLAYER_ROLES = [
  { value: "Batsman", label: "Batsman" },
  { value: "Bowler", label: "Bowler" },
  { value: "All Rounder", label: "All Rounder" },
];

export default function RegistrationForm({ onSuccess }) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      playerName: "",
      phoneNumber: "",
      address: "",
      role: "",
      jerseySize: "",
      jerseyNumber: "",
      utr: "",
    },
  });

  const onSubmit = async (data) => {
    if (!photoFile) {
      setPhotoError("Player photo is required");
      return;
    }

    setIsSubmitting(true);
    try {
      setSubmitStage("Checking registration...");
      const existingRegId = await checkDuplicatePhone(data.phoneNumber);
      if (existingRegId) {
        toast.error(`Phone already registered (ID: ${existingRegId})`);
        setIsSubmitting(false);
        setSubmitStage("");
        return;
      }

      setSubmitStage("Uploading photo...");
      const photoUrl = await uploadToCloudinary(photoFile);

      setSubmitStage("Saving details...");
      const registrationId = await createRegistration({
        ...data,
        playerPhotoUrl: photoUrl,
      });

      reset();
      setPhotoFile(null);
      toast.success("Registration Successful!");
      onSuccess(registrationId, data.playerName);
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setSubmitStage("");
    }
  };

  const handlePhotoChange = (file, error) => {
    setPhotoFile(file);
    setPhotoError(error || "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">

        <div className="relative z-10">
          <div className="mb-8 flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-600" />
              Player Information
            </h3>
          </div>

          <div className="mb-8">
            <PhotoUpload
              value={photoFile}
              onChange={handlePhotoChange}
              error={photoError}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <div className="md:col-span-2">
              <Input
                label="Full Name"
                id="playerName"
                placeholder="e.g. MS Dhoni"
                icon={User}
                register={register("playerName")}
                error={errors.playerName?.message}
              />
            </div>

            <Input
              label="Phone Number"
              id="phoneNumber"
              type="tel"
              placeholder="10-digit number"
              icon={Phone}
              register={register("phoneNumber")}
              error={errors.phoneNumber?.message}
            />

            <Select
              label="Player Role"
              id="role"
              options={PLAYER_ROLES}
              placeholder="Select role"
              register={register("role")}
              error={errors.role?.message}
            />
            
            <div className="md:col-span-2 relative z-10 space-y-1.5">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-slate-700 tracking-wide"
              >
                Full Address <span className="text-emerald-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <div className="absolute top-4 left-0 pl-3.5 flex items-start pointer-events-none transition-colors duration-300 group-focus-within:text-emerald-600 text-slate-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <textarea
                  id="address"
                  rows="3"
                  className={`
                    block w-full rounded-xl border bg-white px-4 py-3.5 pl-11 text-base text-slate-900
                    placeholder:text-slate-400 transition-all duration-300 shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none
                    ${errors.address
                      ? "border-red-300 focus:border-red-500 bg-red-50/50"
                      : "border-slate-200 focus:border-emerald-500 hover:border-slate-300"
                    }
                  `}
                  placeholder="Enter your complete address..."
                  {...register("address")}
                />
              </div>
              {errors.address && (
                <p className="text-xs text-red-500 flex items-center gap-1.5 mt-1 font-medium">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.address.message}
                </p>
              )}
            </div>

            <Select
              label="Jersey Size"
              id="jerseySize"
              options={JERSEY_SIZES}
              placeholder="Select size"
              register={register("jerseySize")}
              error={errors.jerseySize?.message}
            />

            <Input
              label="Jersey Number"
              id="jerseyNumber"
              type="number"
              placeholder="Enter jersey number"
              icon={Hash}
              register={register("jerseyNumber", { valueAsNumber: true })}
              error={errors.jerseyNumber?.message}
            />
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
              Payment Details
            </h3>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <p className="text-sm font-semibold text-slate-700 mb-4 text-center">
                  Scan QR Code to Pay
                </p>
                <img
                  src={qrCodeImage}
                  alt="Payment QR Code"
                  className="max-w-[200px] w-full h-auto rounded-xl shadow-md"
                />

                <div className="mt-5 w-full flex flex-col items-center">
                  <div className="flex items-center gap-4 w-full mb-4">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">OR</span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>

                  <a
                    href="upi://pay?pa=huddad477-1@okhdfcbank&pn=DMCC&am=200&cu=INR"
                    className="w-full py-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Pay Now
                  </a>
                  <p className="text-[10px] text-slate-500 mt-2 text-center">
                    Directly opens GPay, PhonePe, Paytm, etc.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center h-full space-y-4">
                <p className="text-sm text-slate-600">
                  After successful payment, please enter the UTR (Unique Transaction Reference) or Transaction ID below for verification.
                </p>
                <div className="mt-2">
                  <Input
                    label="UTR / Transaction ID"
                    id="utr"
                    placeholder="Payment Reference No."
                    icon={Info}
                    register={register("utr")}
                    error={errors.utr?.message}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          size="xl"
          loading={isSubmitting}
        >
          {isSubmitting ? submitStage : "Submit Registration"}
        </Button>
      </div>
    </form>
  );
}
