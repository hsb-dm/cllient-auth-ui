import { AuthPageLayout } from "../auth-page-layout";
import {
  ForgetPasswordForm,
  type ForgetPasswordFormProps,
} from "./forget-password-form";
import styles from "./forget-password-page-view.module.css";
import type { AuthDictionary, AuthLocale } from "../i18n";

export type ForgetPasswordPageViewProps = Omit<
  ForgetPasswordFormProps,
  "copy" | "showPasswordLabel" | "hidePasswordLabel"
> & {
  locale: AuthLocale;
  dictionary: AuthDictionary;
  copy?: ForgetPasswordFormProps["copy"];
  homeHref?: string;
  copyrightText?: string;
};

export function ForgetPasswordPageView({
  locale,
  dictionary,
  homeHref,
  copyrightText,
  loginHref,
  copy,
  ...formProps
}: ForgetPasswordPageViewProps) {
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
