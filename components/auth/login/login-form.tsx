"use client";

import Link from "next/link";
import { useState, type FormEventHandler } from "react";
import { Button } from "../button";
import type { LoginCopy } from "../i18n";
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
} from "../inputs";
import styles from "./login-form.module.css";

export type LoginMethod = "phone" | "email";

export type LoginFormProps = {
  copy: LoginCopy;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  defaultMethod?: LoginMethod;
  forgotPasswordHref?: string;
  registerHref?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function LoginForm({
  copy,
  showPasswordLabel,
  hidePasswordLabel,
  defaultMethod = "phone",
  forgotPasswordHref = "/id/forget-password",
  registerHref = "/id/register",
  onSubmit,
}: LoginFormProps) {
  const [method, setMethod] = useState<LoginMethod>(defaultMethod);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    if (onSubmit) {
      onSubmit(event);
      return;
    }

    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>{copy.title}</h1>

      <div className={styles.tabs} aria-label={copy.methodLabel}>
        <Button
          className={styles.tab}
          variant="plain"
          aria-pressed={method === "phone"}
          onClick={() => setMethod("phone")}
        >
          {copy.phoneTab}
        </Button>
        <Button
          className={styles.tab}
          variant="plain"
          aria-pressed={method === "email"}
          onClick={() => setMethod("email")}
        >
          {copy.emailTab}
        </Button>
      </div>

      <div className={styles.fields}>
        {method === "phone" ? (
          <PhoneNumberInput
            label={copy.phoneLabel}
            placeholder={copy.phonePlaceholder}
            required
          />
        ) : (
          <EmailInput required />
        )}
        <PasswordInput
          label={copy.passwordLabel}
          placeholder={copy.passwordLabel}
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
          required
        />
      </div>

      <Link className={styles.forgot} href={forgotPasswordHref}>
        {copy.forgotPassword}
      </Link>

      <Button className={styles.submit} type="submit">
        {copy.submit}
      </Button>

      <p className={styles.register}>
        {copy.noAccount} <Link href={registerHref}>{copy.register}</Link>
      </p>
    </form>
  );
}
