import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LeadPopup } from "@/components/lead-popup";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <LeadPopup />
      <WhatsAppButton />
    </div>
  );
}
