import styles from "./password-requirements.module.css";

export type PasswordRequirement = {
  label: string;
  isMet?: boolean;
};

export type PasswordRequirementsProps = {
  requirements?: readonly PasswordRequirement[];
  className?: string;
};

export const defaultPasswordRequirements: readonly PasswordRequirement[] = [
  { label: "8-12 Karakter" },
  { label: "Memiliki minimal 1 angka" },
  { label: "Memiliki minimal 1 huruf besar" },
  { label: "Memiliki minimal 1 huruf kecil" },
  { label: "Memiliki minimal 1 spesial karakter" },
];

export function PasswordRequirements({
  requirements = defaultPasswordRequirements,
  className,
}: PasswordRequirementsProps) {
  return (
    <ul
      className={[styles.list, className].filter(Boolean).join(" ")}
      aria-label="Persyaratan kata sandi"
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
