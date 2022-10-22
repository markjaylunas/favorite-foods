import {
  Container,
  Divider,
  PasswordInput,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProviderSignIn from "../ProviderSignIn";
import { IconBrandGoogle, IconBrandFacebook } from "@tabler/icons";
import MagicEmailSent from "./MagicEmailSent";

type Form = {
  email: string;
  password: string;
};

const SignInForm: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isMagicLink, setIsMagicLink] = useState(false);
  const [magicEmail, setMagicEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const handleGoogleSignIn = async () => {
    supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http:/localhost:3000/auth",
      },
    });
  };

  const handleFacebookSignIn = async () => {
    supabaseClient.auth.signInWithOAuth({
      provider: "facebook",
      options: {
        redirectTo: "http:/localhost:3000/auth",
      },
    });
  };

  const handleMagicLink = async (data: Form) => {
    const { email } = data;
    if (!email) return;
    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
    });
    if (error) return toast.error(error.message);
    else setMagicEmail(email);
  };

  const handleSignIn = async (data: Form) => {
    setLoading(true);
    const toastLoading = toast.loading("Please wait...");
    const {
      data: { user },
      error,
    } = await supabaseClient.auth.signInWithPassword(data);
    if (error) {
      toast.update(toastLoading, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    if (user) {
      router.push("/");
      toast.update(toastLoading, {
        render: `Sign in as ${user.email}`,
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    }
    setLoading(false);
  };

  const onSubmit = (data: Form) => {
    if (isMagicLink) handleMagicLink(data);
    else handleSignIn(data);
    reset();
  };

  return (
    <Container size="sm">
      <Stack>
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
          {isMagicLink ? (
            ""
          ) : (
            <>
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
                    message:
                      "Password length can't be more than 25 characters.",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <p role="alert" className="error">
                {errors.password?.message}
              </p>
            </>
          )}
          <Switch
            label="Passwordless sign in"
            onClick={() => setIsMagicLink((v) => !v)}
          />
          <button disabled={loading ? true : false} className="btn btn-lg">
            Sign In
          </button>
        </form>
      </Stack>
      <Divider my="sm" label="OR" labelPosition="center" />
      <Stack align={"center"}>
        <ProviderSignIn
          icon={<IconBrandGoogle />}
          name="Google"
          handler={handleGoogleSignIn}
        />
        <ProviderSignIn
          icon={<IconBrandFacebook />}
          name="Facebook"
          handler={handleFacebookSignIn}
        />
      </Stack>
      {magicEmail.length > 3 && <MagicEmailSent email={magicEmail} />}
    </Container>
  );
};

export default SignInForm;
