"use client";

import Link from "next/link";
import { useState, type FormEventHandler } from "react";
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
} from "./inputs";
import styles from "./login-form.module.css";

export type LoginMethod = "phone" | "email";

export type LoginFormProps = {
  defaultMethod?: LoginMethod;
  forgotPasswordHref?: string;
  registerHref?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function LoginForm({
  defaultMethod = "phone",
  forgotPasswordHref = "/forget-password",
  registerHref = "/register",
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
      <h1 className={styles.title}>LOGIN</h1>

      <div className={styles.tabs} aria-label="Metode login">
        <button
          className={styles.tab}
          type="button"
          aria-pressed={method === "phone"}
          onClick={() => setMethod("phone")}
        >
          Nomor telepon
        </button>
        <button
          className={styles.tab}
          type="button"
          aria-pressed={method === "email"}
          onClick={() => setMethod("email")}
        >
          Email
        </button>
      </div>

      <div className={styles.fields}>
        {method === "phone" ? (
          <PhoneNumberInput required />
        ) : (
          <EmailInput required />
        )}
        <PasswordInput required />
      </div>

      <Link className={styles.forgot} href={forgotPasswordHref}>
        Lupa Password
      </Link>

      <button className={styles.submit} type="submit">
        Login
      </button>

      <p className={styles.register}>
        Belum punya akun? <Link href={registerHref}>Daftar disini</Link>
      </p>
    </form>
  );
}
