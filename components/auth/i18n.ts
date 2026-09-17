import enMessages from "@/messages/en.json";
import idMessages from "@/messages/id.json";

export const authLocales = ["id", "en"] as const;

export type AuthLocale = (typeof authLocales)[number];

export type LoginCopy = {
  title: string;
  methodLabel: string;
  phoneTab: string;
  emailTab: string;
  phoneLabel: string;
  phonePlaceholder: string;
  passwordLabel: string;
  forgotPassword: string;
  submit: string;
  noAccount: string;
  register: string;
};

export type ForgetPasswordCopy = {
  title: string;
  methodLabel: string;
  phoneTab: string;
  emailTab: string;
  phoneLabel: string;
  phonePlaceholder: string;
  newPassword: string;
  confirmPassword: string;
  verificationCode: string;
  sendOtp: string;
  submit: string;
  backToLogin: string;
  login: string;
  requirementsLabel: string;
  passwordRules: readonly string[];
};

export type RegisterCopy = {
  title: string;
  phoneLabel: string;
  phonePlaceholder: string;
  verificationCode: string;
  sendOtp: string;
  passwordLabel: string;
  referralCode: string;
  submit: string;
  hasAccount: string;
  login: string;
  bannerAlt: string;
  bannerTitleLineOne: string;
  bannerTitleLineTwo: string;
  bannerTitleLineThree: string;
  bannerCardOne: string;
  bannerCardTwo: string;
  bannerCardThree: string;
  headline: string;
  descriptionLineOne: string;
  descriptionLineTwo: string;
  bonus: string;
  virtualFunds: string;
  marketSimulation: string;
  analysisPractice: string;
  requirementsLabel: string;
  passwordRules: readonly string[];
};

export type AuthDictionary = {
  common: {
    homeLabel: string;
    awardsLabel: string;
    regulatorAlt: string;
    copyright: string;
    showPassword: string;
    hidePassword: string;
  };
  login: LoginCopy;
  forgetPassword: ForgetPasswordCopy;
  register: RegisterCopy;
  metadata: {
    login: { title: string; description: string };
    forgetPassword: { title: string; description: string };
    register: { title: string; description: string };
  };
};

export const authDictionaries: Record<AuthLocale, AuthDictionary> = {
  id: idMessages,
  en: enMessages,
};

export function isAuthLocale(locale: string): locale is AuthLocale {
  return authLocales.includes(locale as AuthLocale);
}

export function getAuthDictionary(locale: AuthLocale): AuthDictionary {
  return authDictionaries[locale];
}
