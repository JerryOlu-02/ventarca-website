"use server";

import parsePhoneNumberFromString from "libphonenumber-js";
import apiClient from "@/lib/axios";
import { z } from "zod";
import { redirect } from "next/navigation";
import { ErrorResponse } from "@/types/apiResponse";
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

type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  phoneNumber: string;
  lastName: string;
  acceptPromotionalEmails: unknown;
};

export async function validiateRegisterUser(formData: RegisterInput) {
  // const registerUserData = Object.fromEntries(formData);
  const validiatedRegisterUserData = registerSchema.safeParse(formData);

  if (!validiatedRegisterUserData.success) {
    const formFieldErrors = z.flattenError(validiatedRegisterUserData.error);

    return {
      success: false,
      error: {
        firstName: formFieldErrors.fieldErrors.firstName?.[0],
        lastName: formFieldErrors.fieldErrors.lastName?.[0],
        phoneNumber: formFieldErrors.fieldErrors.phoneNumber?.[0],
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

export const registerUserAction = async (data: RegisterInput) => {
  try {
    const response = await axios.post(
      "https://api.ventarca.biz/api/v1/auth/email/register",
      data
    );

    const errorData: ErrorResponse = response.data;

    console.log("Registration Succesful", response.status);

    return { success: true, error: {} };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;

    return {
      error: {
        form:
          typeof errorData.message === "object"
            ? Object.values(errorData.message)[0]
            : errorData.message,
      },
    };
  }
};

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
    const errorData: ErrorResponse = error.response.data;
    console.error("Email Confirmation FAILED", errorData);

    return {
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
    };
  }
}

// LOGIN SERVER FORM VALIDIATION AUTH ACTION
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

// FORGOT PASSWORD AUTH ACTIONS
const ForgotPasswordSchema = z.object({
  email: z.email({ error: "Pease Enter a valid email" }),
});

export async function forgetPassword(prevState: any, formData: FormData) {
  const forgetPasswordData = Object.fromEntries(formData);
  const validiatedForgotPasswordEmail =
    ForgotPasswordSchema.safeParse(forgetPasswordData);

  if (!validiatedForgotPasswordEmail.success) {
    const formFieldErrors = z.flattenError(validiatedForgotPasswordEmail.error);

    return {
      error: {
        email: formFieldErrors.fieldErrors.email?.[0],
      },
    };
  }

  const data = validiatedForgotPasswordEmail.data;

  try {
    const response = await apiClient.post("/auth/forgot/password", { ...data });
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;
    console.error("Forgotpassword Error --->", errorData);

    return {
      error: {
        form:
          typeof errorData.message === "object"
            ? Object.values(errorData.message)[0]
            : errorData.message,
      },
    };
  }

  redirect("/forgot-password/verification-pending");
}

// PASSWORD CHANGE AUTH ACTIONS
const PasswordChangeSchema = z
  .object({
    newPassword: z.string().min(1, "Please Enter a password"),
    confirmPassword: z.string().min(1, "Please Enter a password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function validiatePasswordInputsOnServer(formData: {
  newPassword: string;
  confirmPassword: string;
}) {
  const validiatedChangePasswordData = PasswordChangeSchema.safeParse(formData);

  if (!validiatedChangePasswordData.success) {
    const formFieldErrors = z.flattenError(validiatedChangePasswordData.error);

    return {
      error: {
        newPassword: formFieldErrors.fieldErrors.newPassword?.[0],
        confirmPassword: formFieldErrors.fieldErrors.confirmPassword?.[0],
      },
    };
  }

  return {
    success: "Form was Validiated Successfully",
    error: {},
  };
}

export async function changePassword(password: string, hash: string) {
  try {
    await apiClient.post("/auth/reset/password", {
      password: password,
      hash: hash,
    });

    return {
      success: "Password Reset Successful",
    };
  } catch (error: any) {
    const errorData: ErrorResponse = error.response.data;
    console.error("Could Not Change Password --->", errorData);

    return {
      error:
        typeof errorData.message === "object"
          ? Object.values(errorData.message)[0]
          : errorData.message,
    };
  }
}
