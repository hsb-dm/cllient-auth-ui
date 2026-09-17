import type { ReactNode } from "react";
import styles from "./olive-radial-background.module.css";

type OliveRadialBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export function OliveRadialBackground({
  children,
  className,
}: OliveRadialBackgroundProps) {
  return (
    <div className={[styles.background, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
