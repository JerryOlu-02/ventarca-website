"use client";

import Button from "@/components/common/Button";
import "@/styles/components/forms/LoginForm.scss";
import GoogleSvg from "@/public/icon/google.svg";
import AppleSvg from "@/public/icon/apple.svg";

import { validiateLogin } from "@/actions/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

type LoginInput = {
  email: string;
  password: string;
};

type Initialstate = {
  success?: string;
  error?: {
    email?: string;
    password?: string;
  };
};

export default function LoginForm() {
  const { login } = useAuth();
  const [formState, setFormState] = useState<Initialstate>({
    success: undefined,
    error: {
      email: undefined,
      password: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmitLogin: SubmitHandler<LoginInput> = async (data) => {
    const validiatedData = await validiateLogin(data);

    setFormState(validiatedData);

    const res = await login(data.email, data.password);
    console.log(res);
  };

  return (
    <section className="section login_section">
      <div className="login_container">
        <h4>Welcome Back!</h4>

        <div className="login_buttons">
          <Button className="btn btn-secondary btn-medium">
            <GoogleSvg /> Sign in with Google
          </Button>

          <Button className="btn btn-secondary btn-medium">
            <AppleSvg /> Sign in with Apple
          </Button>
        </div>

        <div className="login_separator">
          <span />
          or
          <span />
        </div>

        <form onSubmit={handleSubmit(onSubmitLogin)} className="login_form">
          <div className="login_form-inputs">
            <div className="login_form-item">
              <label htmlFor="email-login">Email Address</label>

              {formState.error?.email && (
                <span className="error">{formState.error.email}</span>
              )}

              <input
                id="email-login"
                type="text"
                placeholder="Email Address"
                {...register("email")}
              />
            </div>

            <div className="login_form-item">
              <label htmlFor="password-login">Password</label>

              {formState.error?.password && (
                <span className="error">{formState.error.password}</span>
              )}

              <input
                id="password-login"
                type="password"
                placeholder="Password"
                {...register("password")}
              />

              <span className="forgot_pass">Forgot your password?</span>
            </div>
          </div>

          <Button type="submit" className="btn btn-primary btn-medium">
            Sign In
          </Button>
        </form>

        <p className="register_link">
          Don’t have an account? <span>Create your account.</span>
        </p>
      </div>
    </section>
  );
}
