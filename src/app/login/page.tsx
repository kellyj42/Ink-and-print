import type { Metadata } from "next";
import AuthForm from "../components/auth/auth-form";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Login",
  description: "Sign in to your Ink & Apparels customer account.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
