"use client";

import Image from "next/image";
import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
} from "react";
import glass from "../glass-field.module.css";
import styles from "./auth-input.module.css";
import {
  getDescribedBy,
  InputErrorMessage,
  type InputErrorStateProps,
} from "./input-error";

export type PhoneNumberInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "inputMode"
> &
  InputErrorStateProps & {
    label?: string;
    countryCode?: string;
    countryName?: string;
    flagSrc?: string;
    containerClassName?: string;
  };

export const PhoneNumberInput = forwardRef<
  HTMLInputElement,
  PhoneNumberInputProps
>(function PhoneNumberInput(
  {
    id,
    label = "Nomor telepon",
    name = "phone",
    placeholder = "Nomor Telepon",
    autoComplete = "tel-national",
    countryCode = "+62",
    countryName = "Indonesia",
    flagSrc = "/hsb/flag-indonesia.svg",
    containerClassName,
    isError = false,
    errorMessage,
    className,
    "aria-describedby": describedBy,
    "aria-invalid": ariaInvalid,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? `${generatedId}-phone`;
  const errorId = `${inputId}-error`;
  const errorClassName = isError ? styles.fieldError : undefined;

  return (
    <div
      className={[styles.inputGroup, containerClassName]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.phoneRow}>
        <div
          className={[glass.glass, styles.country, errorClassName]
            .filter(Boolean)
            .join(" ")}
        >
          <Image src={flagSrc} alt={countryName} width={30} height={15} />
          <span>{countryCode}</span>
        </div>
        <label className={styles.srOnly} htmlFor={inputId}>
          {label}
        </label>
        <input
          {...inputProps}
          ref={ref}
          className={[
            glass.glass,
            styles.phoneInput,
            errorClassName,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          id={inputId}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={isError || ariaInvalid}
          aria-describedby={getDescribedBy(
            describedBy,
            errorId,
            isError,
            errorMessage,
          )}
        />
      </div>
      <InputErrorMessage
        id={errorId}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
});
