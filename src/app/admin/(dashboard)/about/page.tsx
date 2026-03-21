import { getSiteSettings } from "@/app/actions/settings";
import { AboutEditor } from "./about-editor";

export const dynamic = "force-dynamic";

export default async function AdminAboutPage() {
  const settings = await getSiteSettings();
  return <AboutEditor initialSettings={settings} />;
}
