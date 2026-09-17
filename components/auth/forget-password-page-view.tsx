import { AuthPageLayout } from "./auth-page-layout";
import {
  ForgetPasswordForm,
  type ForgetPasswordFormProps,
} from "./forget-password-form";
import styles from "./forget-password-page-view.module.css";

export type ForgetPasswordPageViewProps = ForgetPasswordFormProps & {
  homeHref?: string;
  copyrightText?: string;
};

export function ForgetPasswordPageView({
  homeHref = "/",
  copyrightText = "Copyright ©2026 HSB dilindungi undang-undang.",
  ...formProps
}: ForgetPasswordPageViewProps) {
  return (
    <AuthPageLayout
      className={styles.page}
      homeHref={homeHref}
      copyrightText={copyrightText}
    >
      <ForgetPasswordForm {...formProps} />
    </AuthPageLayout>
  );
}
