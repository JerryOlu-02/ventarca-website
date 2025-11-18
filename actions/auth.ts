"use server";

import parsePhoneNumberFromString from "libphonenumber-js";
import apiClient from "@/lib/axios";
import { success, z } from "zod";
import { redirect } from "next/navigation";
import axios from "axios";
import { error } from "console";

// REGISTER AUTH ACTIONS
const registerSchema = z.object({
  email: z.email({ error: "Pease Enter a valid email" }),
  password: z.string().min(1, "Please Enter a password"),
  firstName: z.string().min(1, "Please Enter First name"),
  phoneNumber: z.string().transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg, {
      defaultCountry: "GB",
      extract: false,
    });

    if (phone && phone.isValid()) {
      return phone.number;
    }

    ctx.addIssue({
      code: "custom",
      message: "Invalid phone number",
      path: ["phoneNumber"],
    });

    return z.NEVER;
  }),
  lastName: z.string().min(1, "Please Enter Last name"),
  acceptPromotionalEmails: z.coerce.boolean(),
});

export async function registerUser(prevState: any, formData: FormData) {
  const registerUserData = Object.fromEntries(formData);
  const validiatedRegisterUserData = registerSchema.safeParse(registerUserData);

  if (!validiatedRegisterUserData.success) {
    const formFieldErrors = z.flattenError(validiatedRegisterUserData.error);

    return {
      error: {
        firstName: formFieldErrors.fieldErrors.firstName?.[0],
        lastName: formFieldErrors.fieldErrors.lastName?.[0],
        phoneNumber: formFieldErrors.fieldErrors.phoneNumber?.[0],
        email: formFieldErrors.fieldErrors.email?.[0],
        password: formFieldErrors.fieldErrors.password?.[0],
        acceptPromotionalEmails:
          formFieldErrors.fieldErrors.acceptPromotionalEmails?.[0],
      },
    };
  }

  const data = validiatedRegisterUserData.data;

  try {
    const response = await apiClient.post("/auth/email/register", data);

    console.log("Registration Succesful", response.status);
  } catch (error: any) {
    console.error("SIGN UP FAILED", error.status);

    return {
      error: { form: "Sign Up Failed" },
    };
  }

  redirect("/register/verification-pending");
}

// CONFIRM EMAIL
export async function confirmEmail(hash: string) {
  try {
    await apiClient.post("/auth/email/confirm", {
      hash: hash,
    });

    return {
      success:
        "Your email has been verified. Proceed to sign in to complete your onboarding.",
    };
  } catch (error: any) {
    console.error("Email Confirmation FAILED", error.status);

    return {
      error: `${
        error.status === 404
          ? "Email has already been verified. Proceed to sign in to complete your onboarding."
          : "Verification Failed"
      }`,
    };
  }
}

// LOGIN AUTH ACTION
const loginSchema = z.object({
  email: z.email({ error: "Pease Enter a valid email" }),
  password: z.string().min(1, "Please Enter a password"),
});

export async function validiateLogin(formData: {
  email: string;
  password: string;
}) {
  const validiatedLoginUserData = loginSchema.safeParse(formData);

  if (!validiatedLoginUserData.success) {
    const formFieldErrors = z.flattenError(validiatedLoginUserData.error);

    return {
      success: undefined,
      error: {
        email: formFieldErrors.fieldErrors.email?.[0],
        password: formFieldErrors.fieldErrors.password?.[0],
      },
    };
  }

  return {
    success: "Form was Validiated Successfully",
    error: {},
  };
}
