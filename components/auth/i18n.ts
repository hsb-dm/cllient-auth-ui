import type { Locale } from "@/i18n-config";

export type AuthLocale = Locale;

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
