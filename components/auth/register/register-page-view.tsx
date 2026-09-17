import Image from "next/image";
import { Container } from "../../layout/container";
import { OliveRadialBackground } from "../../olive-radial-background";
import { AuthHeader } from "../auth-header";
import { AuthFooter } from "../auth-footer";
import { AuthFormFrame } from "../auth-form-frame";
import { RegisterForm, type RegisterFormProps } from "./register-form";
import shared from "../auth-page-layout/auth-page-layout.module.css";
import styles from "./register.module.css";
import {
  getAuthDictionary,
  type AuthLocale,
  type RegisterCopy,
} from "../i18n";

export type RegisterPageViewProps = RegisterFormProps & {
  locale?: AuthLocale;
  homeHref?: string;
  copyrightText?: string;
};

export type RegisterBenefitsProps = {
  copy?: RegisterCopy;
  locale?: AuthLocale;
};

export function RegisterBenefits({
  copy = getAuthDictionary("id").register,
  locale = "id",
}: RegisterBenefitsProps) {
  return (
    <section className={styles.promotion} aria-labelledby="register-benefits-heading">
      <div className={styles.bannerWrap}>
        <Image className={styles.banner} src="/register/register-img.png" alt={copy.bannerAlt} width={1216} height={636} sizes="(max-width: 708px) 100vw, 600px" priority />
        {locale === "en" && (
          <div className={styles.bannerTranslation} aria-hidden="true">
            <div className={styles.bannerMainCopy}>
              <span>{copy.bannerTitleLineOne}</span>
              <span>{copy.bannerTitleLineTwo}</span>
              <strong>{copy.bannerTitleLineThree}</strong>
            </div>
            <strong className={`${styles.bannerCardCopy} ${styles.bannerCardOne}`}>{copy.bannerCardOne}</strong>
            <strong className={`${styles.bannerCardCopy} ${styles.bannerCardTwo}`}>{copy.bannerCardTwo}</strong>
            <strong className={`${styles.bannerCardCopy} ${styles.bannerCardThree}`}>{copy.bannerCardThree}</strong>
          </div>
        )}
      </div>
      <h2 id="register-benefits-heading" className={styles.headline}>{copy.headline}</h2>
      <p className={styles.description}>{copy.descriptionLineOne}<br />{copy.descriptionLineTwo}<br /><span className={styles.bonus}>{copy.bonus}</span></p>
      <ul className={styles.benefits}>
        <li><Image src="/register/star.svg" alt="" width={34} height={34} /><span>{copy.virtualFunds} <strong>$10,000</strong></span></li>
        <li><Image src="/register/star.svg" alt="" width={34} height={34} /><span>{copy.marketSimulation}</span></li>
        <li><Image src="/register/star.svg" alt="" width={34} height={34} /><span>{copy.analysisPractice}</span></li>
      </ul>
    </section>
  );
}

export function RegisterPageView({ locale = "id", homeHref, copyrightText, loginHref, copy, ...formProps }: RegisterPageViewProps) {
  const dictionary = getAuthDictionary(locale);

  return (
    <OliveRadialBackground className={`${shared.page} ${styles.page}`}>
      <AuthHeader homeHref={homeHref ?? `/${locale}`} homeLabel={dictionary.common.homeLabel} awardsLabel={dictionary.common.awardsLabel} />
      <main><Container className={styles.columns}>
        <RegisterBenefits copy={copy ?? dictionary.register} locale={locale} />
        <AuthFormFrame><RegisterForm {...formProps} copy={copy ?? dictionary.register} showPasswordLabel={dictionary.common.showPassword} hidePasswordLabel={dictionary.common.hidePassword} loginHref={loginHref ?? `/${locale}/login`} /></AuthFormFrame>
      </Container></main>
      <AuthFooter copyrightText={copyrightText ?? dictionary.common.copyright} regulatorAlt={dictionary.common.regulatorAlt} />
    </OliveRadialBackground>
  );
}
