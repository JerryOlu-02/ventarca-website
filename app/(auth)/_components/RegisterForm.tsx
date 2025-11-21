"use client";

import "@/styles/components/forms/RegisterForm.scss";

import Button from "@/components/common/Button";
import Link from "next/link";

import GoogleSvg from "@/public/icon/google.svg";
import AppleSvg from "@/public/icon/apple.svg";

import { startTransition, useActionState } from "react";

import { registerUser } from "@/actions/auth";

const initialState = {
  success: undefined,
  error: {
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    acceptPromotionalEmails: "",
  },
};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => formAction(formData));
  };

  return (
    <section className="section register_section">
      <div className="register_container">
        <h4>Create Your Free Account</h4>

        <div className="register_buttons">
          <Button className="btn btn-secondary btn-medium">
            <GoogleSvg /> Sign up with Google
          </Button>

          <Button className="btn btn-secondary btn-medium">
            <AppleSvg /> Sign up with Apple
          </Button>
        </div>

        <div className="register_separator">
          <span />
          or
          <span />
        </div>

        <form
          onSubmit={handleSubmit}
          // action={formAction}
          className="register_form"
        >
          <div className="register_form-inputs">
            <div className="register_form-item">
              <div>
                <label htmlFor="firstName">First Name</label>

                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />

                {state.error?.firstName && (
                  <span className="error">{state.error.firstName}</span>
                )}
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />

                {state.error?.lastName && (
                  <span className="error">{state.error.lastName}</span>
                )}
              </div>
            </div>

            <div className="register_form-item">
              <div>
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Email Address"
                />

                {state.error?.email && (
                  <span className="error">{state.error.email}</span>
                )}
              </div>

              <div>
                <label htmlFor="phoneNumber">Phone Number</label>

                <input
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                />

                {state.error?.phoneNumber && (
                  <span className="error">{state.error.phoneNumber}</span>
                )}
              </div>
            </div>

            <div className="register_form-item">
              <div>
                <label htmlFor="password">Password</label>

                {state.error?.password && (
                  <span className="error">{state.error.password}</span>
                )}

                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <aside className="agree_terms">
            <div>
              <input type="checkbox" required /> I agree to Ventarca’s{" "}
              <span>term and policies.</span>
            </div>

            <div>
              <input type="checkbox" name="acceptPromotionalEmails" /> I agree
              to receive mail and updates via mail from Ventarca.
            </div>
          </aside>

          <Button
            type="submit"
            disabled={pending}
            className="btn btn-primary btn-medium"
          >
            <span className="loader" />
            Create My Account
          </Button>
        </form>

        {state.error?.form && (
          <p className="register_link error">{state.error.form}</p>
        )}

        <p className="register_link">
          Already have an account? <Link href="/login">Sign in here.</Link>
        </p>
      </div>
    </section>
  );
}
