import Image from "next/image";
import { Container } from "../../layout/container";
import { authDictionaries } from "../i18n";
import styles from "./auth-footer.module.css";

export type AuthFooterProps = {
  copyrightText?: string;
  regulatorAlt?: string;
};

export function AuthFooter({
  copyrightText = authDictionaries.id.common.copyright,
  regulatorAlt = authDictionaries.id.common.regulatorAlt,
}: AuthFooterProps) {
  return (
    <footer className={styles.footer}>
      <Container className={styles.content}>
        <div className={styles.regulators}>
          <span className={styles.line} aria-hidden="true" />
          <Image
            className={styles.badges}
            src="/hsb/regulator-badges.webp"
            alt={regulatorAlt}
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
