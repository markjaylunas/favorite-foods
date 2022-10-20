import { Container, TextInput, Title } from "@mantine/core";
import axios from "axios";
import type { NextPage } from "next";
import React from "react";
import { useForm } from "react-hook-form";

type Form = {
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const registerUser = async (data: Form) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/register", data, config);

    const result = await res.data;
    console.log(result);
  };

  const onSubmit = (data: Form) => {
    registerUser(data);
    reset();
  };
  return (
    <Container size="sm">
      <Title align="center">Create an account</Title>
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
        <button className="btn">Register</button>
      </form>
    </Container>
  );
};

export default RegisterPage;
