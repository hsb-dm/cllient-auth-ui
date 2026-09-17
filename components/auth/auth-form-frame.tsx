import type { ReactNode } from "react";
import styles from "./auth-form-frame.module.css";

type AuthFormFrameProps = {
  children?: ReactNode;
};

export function AuthFormFrame({ children }: AuthFormFrameProps) {
  return <div className={styles.frame}>{children}</div>;
}
