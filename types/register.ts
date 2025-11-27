import parsePhoneNumberFromString from "libphonenumber-js";
import z from "zod";

export const RegisterSchema = z.object({
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
      // path: ["phoneNumber"],
    });

    return z.NEVER;
  }),
  lastName: z.string().min(1, "Please Enter Last name"),
  acceptPromotionalEmails: z.coerce.boolean(),
});

export type RegisterInput = {
  email: string;
  password: string;
  firstName: string;
  phoneNumber: string;
  lastName: string;
  acceptPromotionalEmails: unknown;
};

export type RegisterInitialstate = {
  success: boolean | string;
  error: {
    form?: string;
    email?: string;
    password?: string;
    firstName?: string;
    phoneNumber?: string;
    lastName?: string;
  };
};
