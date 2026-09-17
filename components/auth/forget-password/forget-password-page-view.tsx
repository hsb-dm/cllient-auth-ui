import { AuthPageLayout } from "../auth-page-layout";
import {
  ForgetPasswordForm,
  type ForgetPasswordFormProps,
} from "./forget-password-form";
import styles from "./forget-password-page-view.module.css";
import { getAuthDictionary, type AuthLocale } from "../i18n";

export type ForgetPasswordPageViewProps = ForgetPasswordFormProps & {
  locale?: AuthLocale;
  homeHref?: string;
  copyrightText?: string;
};

export function ForgetPasswordPageView({
  locale = "id",
  homeHref,
  copyrightText,
  loginHref,
  copy,
  ...formProps
}: ForgetPasswordPageViewProps) {
  const dictionary = getAuthDictionary(locale);

  return (
    <AuthPageLayout
      className={styles.page}
      homeHref={homeHref ?? `/${locale}`}
      homeLabel={dictionary.common.homeLabel}
      awardsLabel={dictionary.common.awardsLabel}
      regulatorAlt={dictionary.common.regulatorAlt}
      copyrightText={copyrightText ?? dictionary.common.copyright}
    >
      <ForgetPasswordForm
        {...formProps}
        copy={copy ?? dictionary.forgetPassword}
        showPasswordLabel={dictionary.common.showPassword}
        hidePasswordLabel={dictionary.common.hidePassword}
        loginHref={loginHref ?? `/${locale}/login`}
      />
    </AuthPageLayout>
  );
}
