import styles from "./password-requirements.module.css";

export type PasswordRequirement = {
  label: string;
  isMet?: boolean;
};

export type PasswordRequirementsProps = {
  requirements: readonly PasswordRequirement[];
  className?: string;
  ariaLabel: string;
};

export function PasswordRequirements({
  requirements,
  className,
  ariaLabel,
}: PasswordRequirementsProps) {
  return (
    <ul
      className={[styles.list, className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      {requirements.map(({ label, isMet = false }) => (
        <li className={styles.item} data-met={isMet} key={label}>
          <span className={styles.indicator} data-met={isMet} aria-hidden="true">
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path
                d="m1 3.5 2.1 2L8 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
