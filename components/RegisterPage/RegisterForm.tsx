import { Container, PasswordInput, TextInput } from "@mantine/core";
import { User, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ActivateAccount from "./ActivateAccount";

type Form = {
  email: string;
  password: string;
};

const RegisterForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();
  const supabaseClient = useSupabaseClient();

  const registerUser = async ({ email, password }: Form) => {
    setLoading(true);
    const toastLoading = toast.loading("Please wait...");

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      toast.update(toastLoading, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } else if (data.user) {
      setUser(data.user);
      toast.update(toastLoading, {
        render: "Email sent!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toast.update(toastLoading, {
        render: "Something went wrong",
        type: "warning",
        isLoading: false,
        autoClose: 5000,
      });
    }
    setLoading(false);
  };

  const onSubmit = (data: Form) => {
    registerUser(data);
    reset();
  };

  if (user?.email) {
    return <ActivateAccount email={user.email} />;
  }

  return (
    <Container size="sm">
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

        <PasswordInput
          placeholder="Enter password"
          label="Password"
          withAsterisk
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

export default RegisterForm;
