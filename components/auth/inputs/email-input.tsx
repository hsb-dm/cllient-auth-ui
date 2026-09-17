"use client";

import { forwardRef } from "react";
import { TextInput, type TextInputProps } from "./text-input";

export type EmailInputProps = Omit<TextInputProps, "label" | "type"> & {
  label?: string;
};

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  function EmailInput(
    {
      label = "Email",
      name = "email",
      placeholder = "Email",
      autoComplete = "email",
      ...inputProps
    },
    ref,
  ) {
    return (
      <TextInput
        {...inputProps}
        ref={ref}
        label={label}
        name={name}
        type="email"
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
    );
  },
);
