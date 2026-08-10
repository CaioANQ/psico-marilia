import { whatsappUrl, mensagens } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl(mensagens.agendar)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
    </a>
  );
}
