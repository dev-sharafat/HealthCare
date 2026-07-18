import z from "zod";
import { Gender } from "../../../../generated/prisma/enums";

const create = z.object({
  
    password: z.string("Password is required").min(8),

    doctor: z.object({
      name: z.string("Name is required"),
      email: z.string("Email is required").email(),
      registrationNumber: z.string("Registration number is required"),
      gender: z.enum(Gender),
      appointmentFee: z.number("Appointment fee must be a number").nonnegative("Appointment fee cannot be negative"),
      qualification: z.string("Qualification is required"),
      currentWorkingPlace: z.string("Current working place is required"),
      designation: z.string("Designation is required"),

      profilePhoto: z.string("Profile photo is optional").optional(),
      contactNumber: z.string("Contact number is optional").optional(),
      address: z.string("Address is optional").optional(),
      experience: z.number("Experience is optional").optional(),
      
    }),

    specialties: z.array(z.string("Specialty is required")).min(1),

});
const update = z.object({});

export const UserValidation = {
  create,
  update,
};
