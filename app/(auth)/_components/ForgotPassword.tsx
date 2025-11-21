"use client";

import { forgetPassword } from "@/actions/auth";
import Button from "@/components/common/Button";
import { useActionState } from "react";

const initialState = {
  success: undefined,
  error: {
    email: "",
  },
};

export default function ForgotPassword() {
  const [state, formAction, pending] = useActionState(
    forgetPassword,
    initialState
  );

  return (
    <section className="section forgot-password_section ">
      <div className="forgot-password_container">
        <aside className="forgot-password_header">
          <h4>Forgot Password?</h4>

          <p>
            Enter your email address in the field below and we’ll send you a
            reset link.
          </p>
        </aside>

        <form action={formAction} className="forgot-password_form">
          <div className="forgot-password_form-item">
            <label htmlFor="email">Email Address</label>

            {state.error?.email && (
              <span className="error">{state.error.email}</span>
            )}

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
            />
          </div>

          <Button
            disabled={pending}
            type="submit"
            className="btn btn-primary btn-medium"
          >
            <span className="loader" /> Get Reset Link
          </Button>

          {state.error?.form && (
            <p className="form_error">{state.error.form}</p>
          )}
        </form>
      </div>
    </section>
  );
}
