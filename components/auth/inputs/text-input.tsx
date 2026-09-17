"use client";

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

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> &
  InputErrorStateProps & {
    label: string;
    type?: InputHTMLAttributes<HTMLInputElement>["type"];
    containerClassName?: string;
  };

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      id,
      label,
      type = "text",
      isError = false,
      errorMessage,
      containerClassName,
      className,
      "aria-describedby": describedBy,
      "aria-invalid": ariaInvalid,
      ...inputProps
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? `${generatedId}-input`;
    const errorId = `${inputId}-error`;

    return (
      <div
        className={[styles.inputGroup, containerClassName]
          .filter(Boolean)
          .join(" ")}
      >
        <label className={styles.srOnly} htmlFor={inputId}>
          {label}
        </label>
        <input
          {...inputProps}
          ref={ref}
          className={[
            glass.glass,
            styles.textInput,
            isError && styles.fieldError,
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          id={inputId}
          type={type}
          aria-invalid={isError || ariaInvalid}
          aria-describedby={getDescribedBy(
            describedBy,
            errorId,
            isError,
            errorMessage,
          )}
        />
        <InputErrorMessage
          id={errorId}
          isError={isError}
          errorMessage={errorMessage}
        />
      </div>
    );
  },
);
