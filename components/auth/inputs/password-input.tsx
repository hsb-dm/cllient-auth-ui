"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
} from "react";
import glass from "../glass-field.module.css";
import styles from "./auth-input.module.css";
import {
  getDescribedBy,
  InputErrorMessage,
  type InputErrorStateProps,
} from "./input-error";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> &
  InputErrorStateProps & {
    label?: string;
    showPasswordLabel?: string;
    hidePasswordLabel?: string;
    containerClassName?: string;
  };

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      id,
      label = "Kata Sandi",
      name = "password",
      placeholder = "Kata Sandi",
      autoComplete = "current-password",
      showPasswordLabel = "Tampilkan kata sandi",
      hidePasswordLabel = "Sembunyikan kata sandi",
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
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = id ?? `${generatedId}-password`;
    const errorId = `${inputId}-error`;

    return (
      <div
        className={[styles.passwordGroup, containerClassName]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={[
            glass.glass,
            styles.passwordField,
            isError && styles.fieldError,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <label className={styles.srOnly} htmlFor={inputId}>
            {label}
          </label>
          <input
            {...inputProps}
            ref={ref}
            className={[styles.passwordInput, className]
              .filter(Boolean)
              .join(" ")}
            id={inputId}
            name={name}
            type={showPassword ? "text" : "password"}
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
          <button
            className={styles.visibilityButton}
            type="button"
            aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {showPassword ? (
                <>
                  <path d="M2 12s3.6-5 10-5 10 5 10 5-3.6 5-10 5-10-5-10-5Z" />
                  <circle cx="12" cy="12" r="2.5" />
                </>
              ) : (
                <>
                  <path d="M3 9.5c2.5 3.5 5.8 5 9 5s6.5-1.5 9-5" />
                  <path d="m5.5 12.5-1.1 2.7M9 14l-.5 2.9m6.5-2.9.5 2.9m3-4.4 1.1 2.7" />
                </>
              )}
            </svg>
          </button>
        </div>
        <InputErrorMessage
          id={errorId}
          isError={isError}
          errorMessage={errorMessage}
        />
      </div>
    );
  },
);
