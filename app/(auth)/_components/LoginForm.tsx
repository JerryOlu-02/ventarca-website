"use client";

import Button from "@/components/common/Button";
import Link from "next/link";

import "@/styles/components/forms/LoginForm.scss";
import GoogleSvg from "@/public/icon/google.svg";
import AppleSvg from "@/public/icon/apple.svg";

import { validiateLogin } from "@/actions/auth";
import { useAuth } from "@/hooks/use-auth";

import { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.email({ error: "Pease Enter a valid email" }),
  password: z.string().min(1, "Please Enter a password"),
});

type LoginInput = {
  email: string;
  password: string;
};

type Initialstate = {
  success?: string;
  error?: {
    email?: string;
    password?: string;
    form?: string;
  };
};

export default function LoginForm() {
  const { login } = useAuth();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmitLogin: SubmitHandler<LoginInput> = async (data) => {
    const validiatedData = await validiateLogin(data);

    setFormState(validiatedData);

    if (validiatedData.success) {
      setLoading(true);

      const res = await login(data.email, data.password);

      setLoading(false);

      if (res.ok) router.replace("/");
      else {
        setFormState({ error: { form: res.error } });
      }
    }
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

              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}

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

              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}

              {formState.error?.password && (
                <span className="error">{formState.error.password}</span>
              )}

              <input
                id="password-login"
                type="password"
                placeholder="Password"
                {...register("password")}
              />

              <Link href="/forgot-password" className="forgot_pass">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="btn btn-primary btn-medium"
          >
            <span className="loader" />
            Sign In
          </Button>
        </form>

        {formState.error?.form && (
          <p className="register_link error">{formState.error.form}</p>
        )}

        <p className="register_link">
          Don’t have an account?{" "}
          <Link href="/register">Create your account.</Link>
        </p>
      </div>
    </section>
  );
}
