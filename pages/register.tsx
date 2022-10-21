import {
  Container,
  Group,
  Paper,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { User } from "@prisma/client";
import axios from "axios";
import type { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(true);
  const [user, setUser] = useState<User>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const registerUser = async (data: Form) => {
    setLoading(true);
    const toastLoading = toast.loading("Please wait...");
    try {
      const res = await axios.post("/api/register", data);
      const { user, message } = await res.data;

      if (user) {
        setUser(user);
        setEmailSent(true);
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
            err.response?.data.message || err.response?.data.error.message,
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
    registerUser(data);
    reset();
  };

  if (emailSent && user) {
    return (
      <Container>
        <Space h="lg" />
        <Space h="lg" />
        <Paper shadow="md" radius="lg" p="xl" withBorder>
          <Title>Your account has been created!</Title>

          <Group>
            <Text>
              To activate it, please click the link we&apos;ve sent to{" "}
            </Text>
            <Text underline color="yellow">
              {user?.email}
            </Text>
          </Group>
        </Paper>
      </Container>
    );
  }

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
        <button className="btn" disabled={loading ? true : false}>
          Register
        </button>
      </form>
    </Container>
  );
};

export default RegisterPage;
