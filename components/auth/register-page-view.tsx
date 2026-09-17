import Image from "next/image";
import { Container } from "../layout/container";
import { OliveRadialBackground } from "../olive-radial-background";
import { AuthHeader } from "./auth-header";
import { AuthFooter } from "./auth-footer";
import { AuthFormFrame } from "./auth-form-frame";
import { RegisterForm, type RegisterFormProps } from "./register-form";
import shared from "./auth-page-layout.module.css";
import styles from "./register.module.css";

export type RegisterPageViewProps = RegisterFormProps & {
  homeHref?: string;
  copyrightText?: string;
};

export function RegisterBenefits() {
  return (
    <section className={styles.promotion} aria-labelledby="register-benefits-heading">
      <Image className={styles.banner} src="/register/register-img.png" alt="Trading tanpa risiko dengan akun demo HSB: aman dan legal, gratis dana virtual, tanpa syarat deposit" width={1216} height={636} sizes="(max-width: 708px) 100vw, 600px" priority />
      <h2 id="register-benefits-heading" className={styles.headline}>BUKA AKUN DEMO HSB, TRADING AMAN DALAM HITUNGAN MENIT</h2>
      <p className={styles.description}>Mulai berlatih trading dengan akun demo gratis.<br />Asah keahlian trading dan dapatkan<br /><span className={styles.bonus}>Welcome Bonus hingga $350.</span></p>
      <ul className={styles.benefits}>
        <li><Image src="/register/star.svg" alt="" width={34} height={34} /><span>Gratis dana virtual <strong>$10,000</strong></span></li>
        <li><Image src="/register/star.svg" alt="" width={34} height={34} /><span>Simulasi market real-time</span></li>
        <li><Image src="/register/star.svg" alt="" width={34} height={34} /><span>Bebas uji analisis</span></li>
      </ul>
    </section>
  );
}

export function RegisterPageView({ homeHref = "/", copyrightText, ...formProps }: RegisterPageViewProps) {
  return (
    <OliveRadialBackground className={`${shared.page} ${styles.page}`}>
      <AuthHeader homeHref={homeHref} />
      <main><Container className={styles.columns}>
        <RegisterBenefits />
        <AuthFormFrame><RegisterForm {...formProps} /></AuthFormFrame>
      </Container></main>
      <AuthFooter copyrightText={copyrightText} />
    </OliveRadialBackground>
  );
}
