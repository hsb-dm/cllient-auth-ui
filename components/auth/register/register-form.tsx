"use client";

import Link from "next/link";
import { useState, type FormEventHandler, type MouseEventHandler } from "react";
import { Button } from "../button";
import type { RegisterCopy } from "../i18n";
import { PhoneNumberInput, TextInput, PasswordInput } from "../inputs";
import { PasswordRequirements } from "../password-requirements";
import { getPasswordRequirements } from "../forget-password";
import styles from "./register.module.css";

export type RegisterFormProps = {
  copy: RegisterCopy;
  showPasswordLabel: string;
  hidePasswordLabel: string;
  loginHref?: string;
  onSendOtp?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export function RegisterForm({
  copy,
  showPasswordLabel,
  hidePasswordLabel,
  loginHref = "/id/login",
  onSendOtp,
  onSubmit,
}: RegisterFormProps) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const requirements = getPasswordRequirements(password, copy.passwordRules);
  const canSubmit = phone.trim().length > 0 && code.trim().length > 0 && requirements.every((rule) => rule.isMet);

  return (
    <form className={styles.form} onSubmit={(event) => { event.preventDefault(); onSubmit?.(event); }}>
      <h1 className={styles.title}>{copy.title}</h1>
      <PhoneNumberInput label={copy.phoneLabel} placeholder={copy.phonePlaceholder} required value={phone} onChange={(event) => setPhone(event.currentTarget.value)} />
      <div className={styles.verification}>
        <TextInput label={copy.verificationCode} name="verificationCode" placeholder={copy.verificationCode} inputMode="numeric" autoComplete="one-time-code" required value={code} onChange={(event) => setCode(event.currentTarget.value)} />
        <Button className={styles.otp} onClick={onSendOtp}>{copy.sendOtp}</Button>
      </div>
      <PasswordInput label={copy.passwordLabel} placeholder={copy.passwordLabel} showPasswordLabel={showPasswordLabel} hidePasswordLabel={hidePasswordLabel} autoComplete="new-password" required value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
      <PasswordRequirements className={styles.requirements} ariaLabel={copy.requirementsLabel} requirements={requirements} />
      <TextInput containerClassName={styles.referral} label={copy.referralCode} name="referralCode" placeholder={copy.referralCode} />
      <Button className={styles.submit} type="submit" disabled={!canSubmit}>{copy.submit}</Button>
      <p className={styles.login}>{copy.hasAccount} <Link href={loginHref}>{copy.login}</Link></p>
    </form>
  );
}
