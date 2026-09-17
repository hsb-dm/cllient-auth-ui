"use client";

import Link from "next/link";
import {
  useState,
  type FormEventHandler,
  type MouseEventHandler,
} from "react";
import { Button } from "./button";
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
  TextInput,
} from "./inputs";
import {
  PasswordRequirements,
  type PasswordRequirement,
  type PasswordRequirementsProps,
} from "./password-requirements";
import styles from "./forget-password-form.module.css";

export type ForgetPasswordMethod = "phone" | "email";

export type ForgetPasswordFormProps = {
  defaultMethod?: ForgetPasswordMethod;
  loginHref?: string;
  requirements?: PasswordRequirementsProps["requirements"];
  onSendOtp?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function getPasswordRequirements(
  password: string,
): PasswordRequirement[] {
  return [
    {
      label: "8-12 Karakter",
      isMet: password.length >= 8 && password.length <= 12,
    },
    { label: "Memiliki minimal 1 angka", isMet: /\d/.test(password) },
    { label: "Memiliki minimal 1 huruf besar", isMet: /[A-Z]/.test(password) },
    { label: "Memiliki minimal 1 huruf kecil", isMet: /[a-z]/.test(password) },
    {
      label: "Memiliki minimal 1 spesial karakter",
      isMet: /[^A-Za-z0-9]/.test(password),
    },
  ];
}

export function ForgetPasswordForm({
  defaultMethod = "phone",
  loginHref = "/login",
  requirements,
  onSendOtp,
  onSubmit,
}: ForgetPasswordFormProps) {
  const [method, setMethod] = useState<ForgetPasswordMethod>(defaultMethod);
  const [newPassword, setNewPassword] = useState("");
  const visibleRequirements =
    requirements ?? getPasswordRequirements(newPassword);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    if (onSubmit) {
      onSubmit(event);
      return;
    }

    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>ATUR ULANG KATA SANDI</h1>

      <div className={styles.tabs} aria-label="Metode atur ulang kata sandi">
        <Button
          className={styles.tab}
          variant="plain"
          aria-pressed={method === "phone"}
          onClick={() => setMethod("phone")}
        >
          Nomor telepon
        </Button>
        <Button
          className={styles.tab}
          variant="plain"
          aria-pressed={method === "email"}
          onClick={() => setMethod("email")}
        >
          Email
        </Button>
      </div>

      <div className={styles.fields}>
        {method === "phone" ? (
          <PhoneNumberInput required />
        ) : (
          <EmailInput required />
        )}

        <PasswordInput
          name="newPassword"
          label="Kata Sandi Baru"
          placeholder="Kata Sandi Baru"
          autoComplete="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.currentTarget.value)}
          required
        />

        <PasswordRequirements
          className={styles.requirements}
          requirements={visibleRequirements}
        />

        <PasswordInput
          containerClassName={styles.confirmPassword}
          name="confirmPassword"
          label="Konfirmasi kata Sandi Baru"
          placeholder="Konfirmasi kata Sandi Baru"
          autoComplete="new-password"
          required
        />

        <div className={styles.verificationRow}>
          <TextInput
            containerClassName={styles.verificationInput}
            label="Kode Verifikasi"
            name="verificationCode"
            placeholder="Kode Verifikasi"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
          />
          <Button className={styles.sendOtp} onClick={onSendOtp}>
            Kirim OTP
          </Button>
        </div>
      </div>

      <Button className={styles.submit} type="submit">
        Reset Password
      </Button>

      <p className={styles.backToLogin}>
        Kembali ke halaman <Link href={loginHref}>Login</Link>
      </p>
    </form>
  );
}
