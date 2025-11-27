"use client";

import "@/styles/components/forms/RegisterForm.scss";

import Button from "@/components/common/Button";
import Link from "next/link";

import GoogleSvg from "@/public/icon/google.svg";
import AppleSvg from "@/public/icon/apple.svg";

import { useState } from "react";

import { registerUserAction, validiateRegisterUser } from "@/actions/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterInitialstate,
  RegisterInput,
  RegisterSchema,
} from "@/types/register";
import { useRouter } from "next/navigation";

const initialState = {
  success: false,
  error: {
    form: undefined,
    email: undefined,
    password: undefined,
    firstName: undefined,
    phoneNumber: undefined,
    lastName: undefined,
  },
};

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInput>({ resolver: zodResolver(RegisterSchema) });

  const [pending, setPending] = useState(false);

  const [formState, setFormState] =
    useState<RegisterInitialstate>(initialState);

  const registerNewUser: SubmitHandler<RegisterInput> = async (data) => {
    // console.log(data);
    const validiatedData = await validiateRegisterUser(data);

    setFormState(validiatedData);

    if (validiatedData.success) {
      setPending(true);

      const res = await registerUserAction(data);

      setPending(false);

      if (res.success) {
        router.push("/register/verification-pending");

        return setFormState({ success: true, error: {} });
      } else {
        setFormState({ success: false, error: { form: res.error.form } });
      }
    }
  };

  // const [state, formAction, pending] = useActionState(
  //   registerUser,
  //   initialState
  // );

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);

  //   startTransition(() => formAction(formData));
  // };

  return (
    <section className="section register_section">
      <div className="register_container">
        <h4>Create Your Free Account</h4>

        <div className="register_buttons">
          <Button type="button" className="btn btn-secondary btn-medium">
            <GoogleSvg /> Sign up with Google
          </Button>

          <Button type="button" className="btn btn-secondary btn-medium">
            <AppleSvg /> Sign up with Apple
          </Button>
        </div>

        <div className="register_separator">
          <span />
          or
          <span />
        </div>

        <form
          onSubmit={handleSubmit(registerNewUser)}
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
                  {...register("firstName")}
                  // name="firstName"
                  placeholder="First Name"
                />

                {formState.error?.firstName && (
                  <span className="error">{formState.error.firstName}</span>
                )}

                {errors.firstName && (
                  <span className="error">{errors.firstName.message}</span>
                )}

                {/* {state.error?.firstName && (
                  <span className="error">{state.error.firstName}</span>
                )} */}
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>

                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  // name="lastName"
                  placeholder="Last Name"
                />

                {formState.error?.lastName && (
                  <span className="error">{formState.error.lastName}</span>
                )}

                {errors.lastName && (
                  <span className="error">{errors.lastName.message}</span>
                )}

                {/* {state.error?.lastName && (
                  <span className="error">{state.error.lastName}</span>
                )} */}
              </div>
            </div>

            <div className="register_form-item">
              <div>
                <label htmlFor="email">Email Address</label>

                <input
                  id="email"
                  type="text"
                  {...register("email")}
                  // name="email"
                  placeholder="Email Address"
                />

                {formState.error?.email && (
                  <span className="error">{formState.error.email}</span>
                )}
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
                {/* {state.error?.email && (
                  <span className="error">{state.error.email}</span>
                )} */}
              </div>

              <div>
                <label htmlFor="phoneNumber">Phone Number</label>

                <input
                  id="phoneNumber"
                  type="text"
                  {...register("phoneNumber")}
                  // name="phoneNumber"
                  placeholder="Phone Number"
                />

                {formState.error?.phoneNumber && (
                  <span className="error">{formState.error.phoneNumber}</span>
                )}
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber.message}</span>
                )}

                {/* {state.error?.phoneNumber && (
                  <span className="error">{state.error.phoneNumber}</span>
                )} */}
              </div>
            </div>

            <div className="register_form-item">
              <div>
                <label htmlFor="password">Password</label>

                {/* {state.error?.password && (
                  <span className="error">{state.error.password}</span>
                )} */}

                {formState.error?.password && (
                  <span className="error">{formState.error.password}</span>
                )}
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}

                <input
                  id="password"
                  type="password"
                  // name="password"
                  {...register("password")}
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
              <input
                type="checkbox"
                {...register("acceptPromotionalEmails")}
                // name="acceptPromotionalEmails"
              />
              I agree to receive mail and updates via mail from Ventarca.
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

        {formState.error?.form && (
          <span className="register_link error">{formState.error.form}</span>
        )}

        {/* {state.error?.form && (
          <p className="register_link error">{state.error.form}</p>
        )} */}

        <p className="register_link">
          Already have an account? <Link href="/login">Sign in here.</Link>
        </p>
      </div>
    </section>
  );
}
