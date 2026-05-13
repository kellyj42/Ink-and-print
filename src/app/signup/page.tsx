import type { Metadata } from "next";
import AuthForm from "../components/auth/auth-form";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Create Account",
  description: "Create an Ink & Apparels customer account for faster repeat orders.",
  path: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}
