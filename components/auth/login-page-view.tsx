import { AuthPageLayout } from "./auth-page-layout";
import { LoginForm, type LoginFormProps } from "./login-form";

export type LoginPageViewProps = {
  homeHref?: string;
  forgotPasswordHref?: string;
  registerHref?: string;
  copyrightText?: string;
  defaultMethod?: LoginFormProps["defaultMethod"];
};

export function LoginPageView({
  homeHref = "/",
  forgotPasswordHref = "/forget-password",
  registerHref = "/register",
  copyrightText = "Copyright ©2026 HSB dilindungi undang-undang.",
  defaultMethod = "phone",
}: LoginPageViewProps) {
  return (
    <AuthPageLayout homeHref={homeHref} copyrightText={copyrightText}>
      <LoginForm
        defaultMethod={defaultMethod}
        forgotPasswordHref={forgotPasswordHref}
        registerHref={registerHref}
      />
    </AuthPageLayout>
  );
}
