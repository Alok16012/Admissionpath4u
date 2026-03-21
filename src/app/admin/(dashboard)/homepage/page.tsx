import { getSiteSettings } from "@/app/actions/settings";
import { HeroEditor } from "./hero-editor";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const settings = await getSiteSettings();
  return <HeroEditor initialSettings={settings} />;
}
