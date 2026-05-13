import type { Metadata } from "next";
import ProfileClient from "./profile-client";
import { buildMetadata } from "../../lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Profile",
  description: "View your account profile and order shortcuts.",
  path: "/profile",
  noIndex: true,
});

export default function ProfilePage() {
  return <ProfileClient />;
}
