import { z } from "zod";

export const registrationSchema = z.object({
  playerName: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .nonempty("Player name is required"),
  
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .nonempty("Address is required"),
  
  role: z
    .enum(["Batsman", "Bowler", "All Rounder"], {
      errorMap: () => ({ message: "Please select a player role" }),
    }),
  
  jerseySize: z
    .string()
    .nonempty("Please select a jersey size"),
  
  jerseyNumber: z
    .number({
      required_error: "Jersey number is required",
      invalid_type_error: "Jersey number must be a number",
    })
    .int("Jersey number must be a whole number")
    .min(0, "Jersey number cannot be negative")
    .max(999, "Jersey number cannot exceed 999"),
  
  utr: z
    .string()
    .nonempty("UTR / Transaction ID is required")
    .min(4, "UTR must be at least 4 characters long"),
});
