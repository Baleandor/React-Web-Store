import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router";
import AuthCard from "../components/form/AuthCard";
import FormField from "../components/form/FormField";
import { useNotify } from "../hooks/useNotify";
import { registerSchema, type RegisterValues } from "../schemas";
import { supabaseClient } from "../supabase/client";
import { getRedirectPath, ROUTES } from "../utils/routes";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const notify = useNotify();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async ({ email, password, displayName }: RegisterValues) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, wishlist: [], offers: [] },
      },
    });

    if (error) {
      notify.error(error);
      return;
    }

    // Without a session the project requires email confirmation first.
    if (!data.session) {
      notify.success("Check yer email to confirm your account!");
      navigate(ROUTES.LOGIN, { state: location.state });
      return;
    }

    notify.success(`Welcome to da mob, ${displayName}!`);
    navigate(getRedirectPath(location.state), { replace: true });
  };

  return (
    <AuthCard
      title="Create an account"
      footer={
        <>
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} state={location.state} className="link">
            Log in
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
        <FormField label="Display name" error={errors.displayName?.message}>
          <input
            autoComplete="nickname"
            className="input"
            {...register("displayName")}
          />
        </FormField>
        <FormField label="Password" error={errors.password?.message}>
          <input
            type="password"
            autoComplete="new-password"
            className="input"
            {...register("password")}
          />
        </FormField>
        <FormField
          label="Confirm password"
          error={errors.confirmPassword?.message}
        >
          <input
            type="password"
            autoComplete="new-password"
            className="input"
            {...register("confirmPassword")}
          />
        </FormField>
        <button
          type="submit"
          className="mt-2 btn btn-solid"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </button>
      </form>
    </AuthCard>
  );
}
