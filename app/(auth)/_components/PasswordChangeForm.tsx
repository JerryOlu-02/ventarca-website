"use client";

import {
  changePassword,
  validiatePasswordInputsOnServer,
} from "@/actions/auth";
import Button from "@/components/common/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const PasswordChangeSchema = z
  .object({
    newPassword: z.string().min(1, "Please Enter a password"),
    confirmPassword: z.string().min(1, "Please Enter a password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordChangeInput = z.infer<typeof PasswordChangeSchema>;

type Initialstate = {
  success?: string;
  error?: {
    newPassword?: string;
    confirmPassword?: string;
    form?: string;
  };
};

export default function PasswordChangeForm({ hash }: { hash: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState<Initialstate>({
    success: undefined,
    error: {
      newPassword: undefined,
      confirmPassword: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordChangeInput>({
    resolver: zodResolver(PasswordChangeSchema),
  });

  const resetPasswordOnSubmit: SubmitHandler<PasswordChangeInput> = async (
    data
  ) => {
    const validiatedData = await validiatePasswordInputsOnServer(data);

    if (validiatedData.error) setFormState(validiatedData);

    if (validiatedData.success) {
      setLoading(true);

      const res = await changePassword(data.confirmPassword, hash);

      setLoading(false);

      if (res.success) router.replace("/password-change/successful");
      else {
        setFormState({ error: { form: res.error } });
      }
    }
  };

  return (
    <section className="section forgot-password_section password-change_section">
      <div className="forgot-password_container">
        <aside className="forgot-password_header">
          <h4>Enter New Password</h4>

          <p>
            Enter a new password for your account to complete your password
            reset.
          </p>
        </aside>

        <form
          onSubmit={handleSubmit(resetPasswordOnSubmit)}
          className="forgot-password_form"
        >
          <div className="forgot-password_form-item">
            <label htmlFor="newPassword">New Password</label>

            {errors.newPassword && (
              <span className="error">{errors.newPassword.message}</span>
            )}

            {formState.error?.newPassword && (
              <span className="error">{formState.error.newPassword}</span>
            )}

            <input
              id="newPassword"
              type="password"
              {...register("newPassword")}
              placeholder="Email Address"
            />
          </div>

          <div className="forgot-password_form-item">
            <label htmlFor="confirmPassword">Confirm Password</label>

            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
            )}

            {formState.error?.confirmPassword && (
              <span className="error">{formState.error.confirmPassword}</span>
            )}

            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              placeholder="Password"
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="btn btn-primary btn-medium"
          >
            <span className="loader" /> Confirm Reset
          </Button>
        </form>

        {formState.error?.form && (
          <p className="form_error">{formState.error.form}</p>
        )}

        {formState.success && <p className="form_error">{formState.success}</p>}
      </div>
    </section>
  );
}
