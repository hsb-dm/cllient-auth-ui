

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



# HSB Login UI

This module contains a reusable HSB login page for the Next.js App Router.
It uses CSS Modules and does not require Tailwind CSS or a UI library.

## Files to copy

Keep the following paths unchanged so that all imports and asset URLs work
without additional configuration:

```text
components/auth/
components/layout/
components/olive-radial-background.tsx
components/olive-radial-background.module.css
app/[lang]/
i18n-config.ts
middleware.ts
public/hsb/
public/register/
```

The only runtime dependencies are `next`, `react`, and `react-dom`. The Juturu
and Stolzl fonts are loaded by `auth-page-layout/auth-page-layout.module.css` from
`public/hsb/fonts`.

## Component structure

Each shared component owns a folder containing its implementation, styles, and
barrel export. Page-specific files are grouped by feature:

```text
components/auth/
├── auth-header/
├── auth-footer/
├── auth-form-frame/
├── auth-page-layout/
├── button/
├── inputs/
│   ├── email-input/
│   ├── password-input/
│   ├── phone-number-input/
│   ├── text-input/
│   └── shared/
├── password-requirements/
├── login/
├── forget-password/
├── register/
├── styles/
├── i18n.ts
└── index.ts
```

Consumers should continue importing from `@/components/auth`. The internal
folders can be copied together without exposing their relative paths.

## Basic usage

Create the page under the locale segment and load its dictionary on the server:

```tsx
// app/[lang]/login/page.tsx
import { LoginPageView } from "@/components/auth";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/i18n-config";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <LoginPageView locale={lang} dictionary={dictionary} />;
}
```

## Localized routes

The included App Router pages support Indonesian and English with one shared
component implementation. This follows the official Next.js App Router i18n
pattern. Localized wording lives in `app/[lang]/dictionaries/*.json`, and
`app/[lang]/dictionaries.ts` loads only the active dictionary with a server-only
dynamic import:

```text
/id/login                 /en/login
/id/forget-password       /en/forget-password
/id/register              /en/register
```

`middleware.ts` redirects paths without a locale prefix by checking the
`NEXT_LOCALE` cookie and then falling back to the `id` default locale in
`i18n-config.ts`. Browser language detection is intentionally disabled so a new
visitor always starts in Indonesian. Internal authentication links preserve the
active locale. The locale root layout sets the correct `<html lang>` attribute.

If the target repository does not use the `@/` alias, replace the route import
with a relative path. Imports inside the module already use relative paths.

## Routes and text configuration

```tsx
<LoginPageView
  locale={lang}
  dictionary={dictionary}
  defaultMethod="phone"
/>
```

`locale` and `dictionary` are required. Routes and translated copy are derived
from them. Link and copyright props remain available as explicit overrides.

## Reusable input components

The form fields are separate components so they can be shared by the login,
forget-password, and future registration pages:

```tsx
import {
  EmailInput,
  PasswordInput,
  PhoneNumberInput,
  TextInput,
} from "@/components/auth";

<PhoneNumberInput label="Phone number" name="phone" />;
<EmailInput name="email" />;
<PasswordInput
  label="Password"
  showPasswordLabel="Show password"
  hidePasswordLabel="Hide password"
  name="password"
/>;
<TextInput
  label="Referral code"
  name="referralCode"
  placeholder="Referral code"
/>;
```

Use `TextInput` for fields that do not need specialized behavior. `EmailInput`
is a convenience wrapper around `TextInput` with the correct email defaults.
`PhoneNumberInput` owns the country-code layout, while `PasswordInput` owns the
password visibility toggle. All components forward their input ref and accept
native input attributes.

## Input error state

Error state belongs to each input instead of `LoginForm`. Pass `isError` and
`errorMessage` directly to the affected field:

```tsx
<EmailInput isError={true} errorMessage="Enter a valid email address" />

<PhoneNumberInput
  label="Phone number"
  isError={true}
  errorMessage="The phone number must start with 8"
/>

<PasswordInput
  label="Password"
  showPasswordLabel="Show password"
  hidePasswordLabel="Hide password"
  isError={true}
  errorMessage="The password must contain at least 8 characters"
/>
```

The input border, country-code border, error message, and accessibility
attributes are applied automatically. The error color is `#F4270B`.

## Connecting authentication

`LoginForm` is a Client Component and accepts an `onSubmit` handler. Use it
directly inside a Client Component in the target repository when the
authentication logic is available:

```tsx
"use client";

import type { FormEvent } from "react";
import { LoginForm, type AuthDictionary } from "@/components/auth";

export function ConnectedLoginForm({ dictionary }: { dictionary: AuthDictionary }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);

    // Call the target application's authentication service here.
    console.log(values.get("phone"), values.get("email"), values.get("password"));
  }

  return (
    <LoginForm
      copy={dictionary.login}
      showPasswordLabel={dictionary.common.showPassword}
      hidePasswordLabel={dictionary.common.hidePassword}
      onSubmit={handleSubmit}
    />
  );
}
```

The default field names are `phone`, `email`, and `password`. `LoginForm` does
not own validation errors; applications that need custom validation rendering
should compose the exported input components in their connected form. Other
visual components are also exported from `components/auth/index.ts`:
`AuthHeader`, `AuthFormFrame`, `LoginForm`, and `AuthFooter`.

## Forget-password page

Create `app/[lang]/forget-password/page.tsx` and load the dictionary as shown in
the login example:

```tsx
import { ForgetPasswordPageView } from "@/components/auth";
import { getDictionary } from "../dictionaries";
import type { Locale } from "@/i18n-config";

export default async function ForgetPasswordPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <ForgetPasswordPageView locale={lang} dictionary={dictionary} />;
}
```

`ForgetPasswordForm` reuses `PhoneNumberInput`, `EmailInput`, `PasswordInput`,
and `TextInput`. It also exports a reusable `PasswordRequirements` component
for the future registration page. The form accepts `onSubmit`, `onSendOtp`,
`defaultMethod`, `loginHref`, and custom password requirements.

The password rules update while the user types. A fulfilled rule uses `#00CA20`
for both its check indicator and label. `getPasswordRequirements` is also
exported so another form can use the same validation rules and translated labels:

```tsx
getPasswordRequirements(password, dictionary.forgetPassword.passwordRules);
```

## Assets

Assets under `public/hsb` were downloaded from the official HSB website and
stored locally so rendering does not depend on network access or external URL
changes. Every public asset URL used by the components starts with `/hsb/`.

## Register page

Create `app/[lang]/register/page.tsx` and render `RegisterPageView` from
`@/components/auth`. Copy `public/register/` together with the shared assets.
The supplied banner and benefit icon are served locally.

`RegisterPageView` requires `locale` and `dictionary`, and also accepts
`homeHref`, `copyrightText`, and the form props.
`RegisterForm` accepts `loginHref`, `onSendOtp`, and `onSubmit`. Wire the callbacks
in a Client Component to your application's services. OTP delivery and account
creation are not connected to a backend in this UI module.

The form reuses the shared inputs and password requirements. The register button
is enabled when a phone number and verification code are present and all password
requirements are met. The referral code is optional. Server-side validation must
be handled by the consuming application. Input errors remain input-level props.

## Button

`Button` is shared by the login, forget-password, and register forms. It accepts
all native button attributes, including `disabled`, `type`, and `onClick`. Its
disabled appearance is handled by the component itself:

```tsx
import { Button } from "@/components/auth";

<Button disabled>Daftar</Button>
<Button variant="plain">Text-only action</Button>
```
