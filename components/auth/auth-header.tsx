import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/container";
import styles from "./auth-header.module.css";

const awards = [
  { year: 2025, name: "OTC Broker", width: 307 },
  { year: 2024, name: "Innovative Broker", width: 308 },
  { year: 2023, name: "Improved Broker", width: 307 },
  { year: 2022, name: "Innovative Broker", width: 307 },
  { year: 2021, name: "Improved Broker", width: 307 },
] as const;

export type AuthHeaderProps = {
  homeHref?: string;
};

export function AuthHeader({ homeHref = "/" }: AuthHeaderProps) {
  return (
    <header className={styles.header}>
      <Container className={styles.content}>
        <Link className={styles.logoLink} href={homeHref} aria-label="HSB, halaman utama">
          <Image
            className={styles.logo}
            src="/hsb/hsb-logo-v2.webp"
            alt="HSB"
            width={220}
            height={79}
            sizes="110px"
            priority
          />
        </Link>

        <div className={styles.awards} role="group" aria-label="Penghargaan HSB">
          {awards.map(({ year, name, width }) => (
            <Image
              key={year}
              className={styles.award}
              src={`/hsb/award-${year}.webp`}
              alt={`${name} ${year}`}
              width={width}
              height={140}
              sizes="93px"
            />
          ))}
        </div>
      </Container>
    </header>
  );
}
