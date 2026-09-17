"use client";

import Link from "next/link";
import { useState, type FormEventHandler, type MouseEventHandler } from "react";
import { Button } from "./button";
import { PhoneNumberInput, TextInput, PasswordInput } from "./inputs";
import { PasswordRequirements } from "./password-requirements";
import { getPasswordRequirements } from "./forget-password-form";
import styles from "./register.module.css";

export type RegisterFormProps = {
  loginHref?: string;
  onSendOtp?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function RegisterForm({
  loginHref = "/login",
  onSendOtp,
  onSubmit,
}: RegisterFormProps) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const requirements = getPasswordRequirements(password);
  const canSubmit = phone.trim().length > 0 && code.trim().length > 0 && requirements.every((rule) => rule.isMet);

  return (
    <form className={styles.form} onSubmit={(event) => { event.preventDefault(); onSubmit?.(event); }}>
      <h1 className={styles.title}>DAFTAR AKUN DEMO</h1>
      <PhoneNumberInput required value={phone} onChange={(event) => setPhone(event.currentTarget.value)} />
      <div className={styles.verification}>
        <TextInput label="Kode Verifikasi" name="verificationCode" placeholder="Kode Verifikasi" inputMode="numeric" autoComplete="one-time-code" required value={code} onChange={(event) => setCode(event.currentTarget.value)} />
        <Button className={styles.otp} onClick={onSendOtp}>Kirim OTP</Button>
      </div>
      <PasswordInput autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
      <PasswordRequirements className={styles.requirements} requirements={requirements} />
      <TextInput containerClassName={styles.referral} label="Kode referral (opsional)" name="referralCode" placeholder="Kode referral (opsional)" />
      <Button className={styles.submit} type="submit" disabled={!canSubmit}>Daftar</Button>
      <p className={styles.login}>Sudah punya akun? <Link href={loginHref}>Login disini</Link></p>
    </form>
  );
}
