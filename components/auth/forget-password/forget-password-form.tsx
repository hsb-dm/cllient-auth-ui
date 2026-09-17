"use client";

import Link from "next/link";
import {
  useState,
  type FormEventHandler,
  type MouseEventHandler,
} from "react";
import { Button } from "../button";
import type { ForgetPasswordCopy } from "../i18n";
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
  TextInput,
} from "../inputs";
import {
  PasswordRequirements,
  type PasswordRequirement,
  type PasswordRequirementsProps,
} from "../password-requirements";
import styles from "./forget-password-form.module.css";

export type ForgetPasswordMethod = "phone" | "email";

export type ForgetPasswordFormProps = {
  copy: ForgetPasswordCopy;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  defaultMethod?: ForgetPasswordMethod;
  loginHref?: string;
  requirements?: PasswordRequirementsProps["requirements"];
  onSendOtp?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function getPasswordRequirements(
  password: string,
  labels: readonly string[],
): PasswordRequirement[] {
  return [
    {
      label: labels[0],
      isMet: password.length >= 8 && password.length <= 12,
    },
    { label: labels[1], isMet: /\d/.test(password) },
    { label: labels[2], isMet: /[A-Z]/.test(password) },
    { label: labels[3], isMet: /[a-z]/.test(password) },
    {
      label: labels[4],
      isMet: /[^A-Za-z0-9]/.test(password),
    },
  ];
}

export function ForgetPasswordForm({
  copy,
  showPasswordLabel,
  hidePasswordLabel,
  defaultMethod = "phone",
  loginHref = "/id/login",
  requirements,
  onSendOtp,
  onSubmit,
}: ForgetPasswordFormProps) {
  const [method, setMethod] = useState<ForgetPasswordMethod>(defaultMethod);
  const [newPassword, setNewPassword] = useState("");
  const visibleRequirements =
    requirements ?? getPasswordRequirements(newPassword, copy.passwordRules);

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
          name="newPassword"
          label={copy.newPassword}
          placeholder={copy.newPassword}
          autoComplete="new-password"
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
          value={newPassword}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
          required
        />

        <PasswordRequirements
          className={styles.requirements}
          ariaLabel={copy.requirementsLabel}
          requirements={visibleRequirements}
        />

        <PasswordInput
          containerClassName={styles.confirmPassword}
          name="confirmPassword"
          label={copy.confirmPassword}
          placeholder={copy.confirmPassword}
          autoComplete="new-password"
          showPasswordLabel={showPasswordLabel}
          hidePasswordLabel={hidePasswordLabel}
          required
        />

        <div className={styles.verificationRow}>
          <TextInput
            containerClassName={styles.verificationInput}
            label={copy.verificationCode}
            name="verificationCode"
            placeholder={copy.verificationCode}
            inputMode="numeric"
            autoComplete="one-time-code"
            required
          />
          <Button className={styles.sendOtp} onClick={onSendOtp}>
            {copy.sendOtp}
          </Button>
        </div>
      </div>

      <Button className={styles.submit} type="submit">
        {copy.submit}
      </Button>

      <p className={styles.backToLogin}>
        {copy.backToLogin} <Link href={loginHref}>{copy.login}</Link>
      </p>
    </form>
  );
}
