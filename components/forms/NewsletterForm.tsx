"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../common/Button";
import { useState } from "react";
import { subscribeToNewsLetter } from "@/actions/newsletter";
// import Modal from "../common/Modal";

type NewsLetterInput = {
  email: string;
  firstName: string;
  lastName: string;
};

export default function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState<string | null>(null);
  const [isSuccessMessage, setIsSuccessMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<NewsLetterInput>();

  const submitNewsletter: SubmitHandler<NewsLetterInput> = async (data) => {
    console.log(data);
    setIsLoading(true);

    const response = await subscribeToNewsLetter(
      data.email,
      data.firstName,
      data.lastName
    );

    if (!response.ok) {
      setIsErrorMessage(response.errorMessage);

      setTimeout(() => {
        setIsErrorMessage(null);
      }, 10000);
    } else {
      reset();

      setIsSuccessMessage("You have successfully subscribed To Our Newsletter");

      setTimeout(() => {
        setIsSuccessMessage(null);
      }, 10000);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submitNewsletter)} className="newsletterForm">
      <div>
        <input
          {...register("firstName", { required: true })}
          type="text"
          placeholder="First Name"
        />
        <input
          {...register("lastName", { required: true })}
          type="text"
          placeholder="Last Name"
        />
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email Address"
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary btn-medium"
      >
        <span className="loader" />
        Subscribe to Newsletter
      </Button>

      {isErrorMessage && <p className="error">{isErrorMessage}</p>}
      {isSuccessMessage && <p className="success">{isSuccessMessage}</p>}
    </form>
  );
}
