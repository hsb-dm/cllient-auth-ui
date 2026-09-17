import { AuthPageLayout } from "../auth-page-layout";
import {
  getAuthDictionary,
  type AuthLocale,
  type LoginCopy,
} from "../i18n";
import { LoginForm, type LoginFormProps } from "./login-form";

export type LoginPageViewProps = {
  locale?: AuthLocale;
  copy?: LoginCopy;
  homeHref?: string;
  forgotPasswordHref?: string;
  registerHref?: string;
  copyrightText?: string;
  defaultMethod?: LoginFormProps["defaultMethod"];
};

export function LoginPageView({
  locale = "id",
  copy,
  homeHref,
  forgotPasswordHref,
  registerHref,
  copyrightText,
  defaultMethod = "phone",
}: LoginPageViewProps) {
  const dictionary = getAuthDictionary(locale);

  return (
    <AuthPageLayout
      homeHref={homeHref ?? `/${locale}`}
      homeLabel={dictionary.common.homeLabel}
      awardsLabel={dictionary.common.awardsLabel}
      regulatorAlt={dictionary.common.regulatorAlt}
      copyrightText={copyrightText ?? dictionary.common.copyright}
    >
      <LoginForm
        copy={copy ?? dictionary.login}
        showPasswordLabel={dictionary.common.showPassword}
        hidePasswordLabel={dictionary.common.hidePassword}
        defaultMethod={defaultMethod}
        forgotPasswordHref={forgotPasswordHref ?? `/${locale}/forget-password`}
        registerHref={registerHref ?? `/${locale}/register`}
      />
    </AuthPageLayout>
  );
}
