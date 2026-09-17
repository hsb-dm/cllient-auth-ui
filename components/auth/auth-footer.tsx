import Image from "next/image";
import { Container } from "../layout/container";
import styles from "./auth-footer.module.css";

export type AuthFooterProps = {
  copyrightText?: string;
};

export function AuthFooter({
  copyrightText = "Copyright ©2026 HSB dilindungi undang-undang.",
}: AuthFooterProps) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.content}>
        <div className={styles.regulators}>
          <span className={styles.line} aria-hidden="true" />
          <Image
            className={styles.badges}
            src="/hsb/regulator-badges.webp"
            alt="BAPPEBTI, OJK, Bank Indonesia, ICDX, Indonesia Clearing House, dan ASPEBTINDO"
            width={1962}
            height={381}
          />
          <span className={styles.line} aria-hidden="true" />
        </div>
        <p className={styles.copyright}>{copyrightText}</p>
      </Container>
    </footer>
  );
}
