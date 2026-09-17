import styles from "./auth-input.module.css";

export type InputErrorStateProps = {
  isError?: boolean;
  errorMessage?: string;
};

type InputErrorMessageProps = InputErrorStateProps & {
  id: string;
};

export function InputErrorMessage({
  id,
  isError = false,
  errorMessage,
}: InputErrorMessageProps) {
  if (!isError || !errorMessage) {
    return null;
  }

  return (
    <p className={styles.errorMessage} id={id} role="alert">
      {errorMessage}
    </p>
  );
}

export function getDescribedBy(
  describedBy: string | undefined,
  errorId: string,
  isError: boolean,
  errorMessage: string | undefined,
) {
  return [describedBy, isError && errorMessage ? errorId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;
}
