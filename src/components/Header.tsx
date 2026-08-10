"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { whatsappUrl, mensagens } from "@/lib/site";
import { WhatsAppIcon } from "@/components/icons";

const links = [
  { href: "/#atendimentos", label: "Atendimentos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#duvidas", label: "Dúvidas" },
  { href: "/evento", label: "Evento ☕", highlight: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-cream/90 shadow-soft backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt="Logo Marília Santos Psicóloga"
              width={44}
              height={44}
              className="h-10 w-10 sm:h-11 sm:w-11"
              priority
            />
            <span className="leading-tight">
              <span className="font-display block text-[1.05rem] font-semibold text-plum-800 sm:text-lg">
                Marília Santos
              </span>
              <span className="block text-[0.68rem] tracking-[0.14em] text-ink-soft uppercase">
                Psicóloga · CRP 06/110313
              </span>
            </span>
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  l.highlight
                    ? "bg-blush-100 text-plum-700 hover:bg-blush-200"
                    : "text-ink-soft hover:bg-blush-50 hover:text-plum-800"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={whatsappUrl(mensagens.agendar)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-plum-700 px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-plum-800 hover:shadow-lift"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Agendar conversa
            </a>
          </nav>

          {/* Botão menu mobile */}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-plum-800 lg:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  open ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute top-2 left-0 block h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-all duration-300 ${
                  open ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Menu mobile — precisa ser irmão do <header>: o backdrop-filter dele
          o tornaria containing block e este painel fixed teria altura zero */}
      <div
        className={`fixed inset-x-0 top-16 bottom-0 z-[45] overflow-y-auto overscroll-contain bg-cream transition-all duration-300 sm:top-20 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2 px-6 pt-8 pb-10">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`font-display rounded-2xl px-4 py-4 text-2xl font-medium text-plum-800 transition-all duration-300 ${
                l.highlight ? "bg-blush-100" : "hover:bg-blush-50"
              } ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={whatsappUrl(mensagens.agendar)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{ transitionDelay: open ? `${links.length * 40}ms` : "0ms" }}
            className={`mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-plum-700 px-6 py-4 text-lg font-semibold text-white shadow-card transition-all duration-300 ${
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            <WhatsAppIcon />
            Agendar conversa
          </a>
        </nav>
      </div>
    </>
  );
}
