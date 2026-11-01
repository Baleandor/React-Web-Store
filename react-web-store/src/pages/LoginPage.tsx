import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import AuthCard from "../components/form/AuthCard";
import FormField from "../components/form/FormField";
import { useNotify } from "../hooks/useNotify";
import { loginSchema, type LoginValues } from "../schemas";
import { supabaseClient } from "../supabase/client";
import { getRedirectPath, ROUTES } from "../utils/routes";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();
  const redirectTo = getRedirectPath(location.state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginValues) => {
    const { error } = await supabaseClient.auth.signInWithPassword(values);
    if (error) {
      notify.error(error);
      return;
    }
    notify.success("Welcome back, boss!");
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthCard
      title="Log in"
      footer={
        <>
          Don't have an account?{" "}
          <Link to={ROUTES.REGISTER} state={location.state} className="link">
            Register
          </Link>
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <FormField label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            className="input"
            {...register("email")}
          />
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <input
            type="password"
            autoComplete="current-password"
            className="input"
            {...register("password")}
          />
        </FormField>
        <button
          type="submit"
          className="mt-2 btn btn-solid"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </AuthCard>
  );
}
