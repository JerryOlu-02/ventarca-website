"use server";

import { z } from "zod";

const schema = z.object({
  email: z.string({
    error: "Invalid Email",
  }),
});

export async function heroSearch(formData: FormData) {}
