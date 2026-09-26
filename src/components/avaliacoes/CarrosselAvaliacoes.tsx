"use client";

import { useEffect, useRef, useState } from "react";
import Estrelas from "@/components/avaliacoes/Estrelas";
import { ArrowRightIcon, CloseIcon, GoogleIcon } from "@/components/icons";
import { google, type Avaliacao } from "@/lib/avaliacoes";

/** Textos maiores que isso aparecem resumidos, com "Ler avaliação completa" */
const LIMITE_TRECHO = 240;

const coresAvatar = [
  "bg-blush-200 text-plum-700",
  "bg-lilac-200 text-plum-800",
  "bg-latte-100 text-latte-800",
  "bg-rose-300/45 text-plum-800",
];

function Avatar({ autor, indice }: { autor: string; indice: number }) {
  const partes = autor.replace(/\./g, "").split(" ");
  const iniciais = partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : "");
  return (
    <span
      aria-hidden
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
        coresAvatar[indice % coresAvatar.length]
      }`}
    >
      {iniciais.toUpperCase()}
    </span>
  );
}

/** Depoimentos curtos ganham destaque tipográfico para o card não parecer vazio */
function estiloTexto(texto: string) {
  if (texto.length <= 70) return "font-display text-2xl leading-snug text-plum-900";
  if (texto.length <= 140) return "font-display text-xl leading-snug text-plum-900";
  return "text-[0.97rem] leading-relaxed text-ink-soft";
}

type Props = {
  avaliacoes: Avaliacao[];
  /** Conteúdo exibido ao lado das setas (ex.: nota sobre privacidade) */
  children?: React.ReactNode;
};

export default function CarrosselAvaliacoes({ avaliacoes, children }: Props) {
  const trilho = useRef<HTMLUListElement>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const [aberta, setAberta] = useState<number | null>(null);
  const [noInicio, setNoInicio] = useState(true);
  const [noFim, setNoFim] = useState(false);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const atualizar = () => {
      setNoInicio(el.scrollLeft < 8);
      setNoFim(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
    };
    atualizar();
    el.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      el.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  useEffect(() => {
    if (aberta !== null) dialogo.current?.showModal();
  }, [aberta]);

  function rolar(sentido: 1 | -1) {
    const el = trilho.current;
    if (!el) return;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Avança uma "página"; o scroll-snap alinha no card mais próximo
    el.scrollBy({ left: sentido * el.clientWidth, behavior: suave ? "smooth" : "auto" });
  }

  const atual = aberta === null ? null : avaliacoes[aberta];

  return (
    <div>
      <ul
        ref={trilho}
        id="trilho-avaliacoes"
        tabIndex={0}
        aria-label="Avaliações de pacientes no Google"
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-2 pb-8 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum-400 sm:-mx-6 sm:scroll-px-6 sm:gap-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {avaliacoes.map((a, i) => {
          const longa = a.texto.length > LIMITE_TRECHO;
          return (
            <li
              key={a.autor}
              className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <article
                aria-label={`Avaliação de ${a.autor}`}
                className="flex h-full flex-col rounded-3xl border border-blush-100 bg-porcelain p-6 shadow-card sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <Estrelas />
                  <GoogleIcon className="h-5 w-5" />
                </div>
                <div className="mt-5 flex-1">
                  {/* No card os parágrafos viram texto corrido, para o resumo
                      não terminar numa linha em branco; a janela mostra o original */}
                  <blockquote
                    className={`${estiloTexto(a.texto)} ${longa ? "line-clamp-6" : ""}`}
                  >
                    {a.texto.replace(/\s*\n+\s*/g, " ")}
                  </blockquote>
                  {longa && (
                    <button
                      type="button"
                      onClick={() => setAberta(i)}
                      className="mt-3 text-sm font-semibold text-plum-600 underline decoration-rose-300 decoration-2 underline-offset-4 transition-colors hover:text-plum-800"
                    >
                      Ler avaliação completa
                    </button>
                  )}
                </div>
                <footer className="mt-6 flex items-center gap-3 border-t border-blush-200/70 pt-5">
                  <Avatar autor={a.autor} indice={i} />
                  <div className="leading-tight">
                    <p className="font-semibold text-plum-900">{a.autor}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">Avaliação no Google</p>
                  </div>
                </footer>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">{children}</div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => rolar(-1)}
            disabled={noInicio}
            aria-controls="trilho-avaliacoes"
            aria-label="Avaliações anteriores"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-plum-300/50 bg-porcelain text-plum-700 shadow-card transition-all hover:-translate-y-0.5 hover:bg-blush-50 disabled:pointer-events-none disabled:opacity-35 disabled:shadow-none"
          >
            <ArrowRightIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => rolar(1)}
            disabled={noFim}
            aria-controls="trilho-avaliacoes"
            aria-label="Próximas avaliações"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-plum-700 text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-plum-800 disabled:pointer-events-none disabled:opacity-35 disabled:shadow-none"
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Avaliação completa — o clique fora do cartão (no fundo) fecha */}
      <dialog
        ref={dialogo}
        aria-labelledby="avaliacao-aberta-autor"
        onClose={() => setAberta(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[85vh] w-[min(92vw,38rem)] overflow-y-auto overscroll-contain rounded-[2rem] bg-cream text-ink shadow-lift backdrop:bg-plum-900/55 backdrop:backdrop-blur-sm"
      >
        {atual && aberta !== null && (
          <div className="p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar autor={atual.autor} indice={aberta} />
                <div>
                  <p
                    id="avaliacao-aberta-autor"
                    className="font-display text-xl font-semibold text-plum-900"
                  >
                    {atual.autor}
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-ink-soft">
                    <Estrelas className="h-3.5 w-3.5" />
                    Avaliação no Google
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => dialogo.current?.close()}
                aria-label="Fechar avaliação"
                className="-mt-1 -mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-plum-700 transition-colors hover:bg-blush-100"
              >
                <CloseIcon />
              </button>
            </div>
            <blockquote className="mt-6 leading-relaxed whitespace-pre-line text-ink-soft">
              {atual.texto}
            </blockquote>
            <a
              href={google.perfilUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-plum-600 transition-colors hover:text-plum-800"
            >
              <GoogleIcon className="h-4 w-4" />
              Ver todas as avaliações no Google
              <ArrowRightIcon className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        )}
      </dialog>
    </div>
  );
}
