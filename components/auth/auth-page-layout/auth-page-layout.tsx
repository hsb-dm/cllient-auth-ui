import type { ReactNode } from "react";
import { Container } from "../../layout/container";
import { OliveRadialBackground } from "../../olive-radial-background";
import { AuthFooter } from "../auth-footer";
import { AuthFormFrame } from "../auth-form-frame";
import { AuthHeader } from "../auth-header";
import styles from "./auth-page-layout.module.css";

export type AuthPageLayoutProps = {
  children: ReactNode;
  homeHref?: string;
  copyrightText: string;
  homeLabel: string;
  awardsLabel: string;
  regulatorAlt: string;
  className?: string;
};

export function AuthPageLayout({
  children,
  homeHref = "/",
  copyrightText,
  homeLabel,
  awardsLabel,
  regulatorAlt,
  className,
}: AuthPageLayoutProps) {
  return (
    <OliveRadialBackground
      className={[styles.page, className].filter(Boolean).join(" ")}
    >
      <AuthHeader
        homeHref={homeHref}
        homeLabel={homeLabel}
        awardsLabel={awardsLabel}
      />
      <main>
        <Container className={styles.formContainer}>
          <AuthFormFrame>{children}</AuthFormFrame>
        </Container>
      </main>
      <AuthFooter copyrightText={copyrightText} regulatorAlt={regulatorAlt} />
    </OliveRadialBackground>
  );
}
