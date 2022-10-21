import { Container, Loader, TextInput, Title } from "@mantine/core";
import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  email: string;
  password: string;
};

const SignInPage: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const router = useRouter();

  const signInWithEmailPass = async (data: Form) => {
    setLoading(true);
    const toastLoading = toast.loading("Please wait...");
    try {
      const response = await axios.post("/api/signin", data);
      const { user, message } = await response.data;

      if (user) {
        router.push("/");
        toast.update(toastLoading, {
          render: message,
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.update(toastLoading, {
          render:
            err.response?.data.error.message || err.response?.data.message,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        console.log(err);
      }
    }
    setLoading(false);
  };
  const onSubmit = (data: Form) => {
    signInWithEmailPass(data);
    reset();
  };
  return (
    <Container size="sm">
      <Title align="center">Sign In</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="Enter email"
          label="Email"
          type="email"
          withAsterisk
          {...register("email", {
            required: "Email is required",
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        <p role="alert" className="error">
          {errors.email?.message}
        </p>

        <TextInput
          placeholder="Enter password"
          label="Password"
          withAsterisk
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 7,
              message: "Password must be at least 8 characters.",
            },
            maxLength: {
              value: 25,
              message: "Password length can't be more than 25 characters.",
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        <p role="alert" className="error">
          {errors.password?.message}
        </p>
        <button className="btn">
          <span>{loading && <Loader size="xs" color="yellow" />}Sign In</span>
        </button>
      </form>
    </Container>
  );
};

export default SignInPage;
