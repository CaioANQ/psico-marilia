import Image from "next/image";
import Link from "next/link";
import { site, whatsappUrl, mensagens } from "@/lib/site";
import { WhatsAppIcon, MapPinIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="bg-plum-900 text-blush-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Logo Marília Santos"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-display text-lg font-semibold text-white">
                  Marília Santos
                </p>
                <p className="text-sm text-blush-300">
                  Psicóloga Clínica · CRP {site.crp}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-blush-200/80">
              Psicoterapia para relações mais conscientes e saudáveis.
              Atendimento presencial no Ipiranga (São Paulo) e online para todo
              o Brasil.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:gap-16">
            <div>
              <p className="mb-3 font-semibold tracking-wide text-white uppercase">
                Navegue
              </p>
              <ul className="space-y-2 text-blush-200/90">
                <li>
                  <Link href="/#atendimentos" className="hover:text-white">
                    Atendimentos
                  </Link>
                </li>
                <li>
                  <Link href="/#sobre" className="hover:text-white">
                    Sobre a Marília
                  </Link>
                </li>
                <li>
                  <Link href="/#duvidas" className="hover:text-white">
                    Dúvidas frequentes
                  </Link>
                </li>
                <li>
                  <Link href="/evento" className="hover:text-white">
                    Vamos falar de amor? ☕
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold tracking-wide text-white uppercase">
                Contato
              </p>
              <ul className="space-y-3 text-blush-200/90">
                <li>
                  <a
                    href={whatsappUrl(mensagens.agendar)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-white"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    {site.telefoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={site.endereco.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 hover:text-white"
                  >
                    <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {site.endereco.rua}
                      <br />
                      {site.endereco.bairro} · {site.endereco.cidadeUf}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-blush-300/70">
          <p>
            © {new Date().getFullYear()} Marília Santos · Psicóloga Clínica ·
            CRP {site.crp}. Todos os direitos reservados.
          </p>
          <p className="mt-1">
            Este site não oferece atendimento de emergência. Em crise, ligue
            188 (CVV) ou procure o serviço de saúde mais próximo.
          </p>
        </div>
      </div>
    </footer>
  );
}
