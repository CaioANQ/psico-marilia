"use client";

import { useEffect, useMemo, useState } from "react";
import { evento, formatBRL, whatsappUrl } from "@/lib/site";
import { pixPayload } from "@/lib/pix";
import {
  CheckIcon,
  CopyIcon,
  WhatsAppIcon,
  ArrowRightIcon,
} from "@/components/icons";

type Etapa = "form" | "pix";

export default function InscricaoCard() {
  const [etapa, setEtapa] = useState<Etapa>("form");
  const [enviando, setEnviando] = useState(false);
  const [registroOk, setRegistroOk] = useState<boolean | null>(null);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copiado, setCopiado] = useState<"payload" | "chave" | null>(null);

  const total = selecionados.length * evento.precoPorEncontro;

  const payload = useMemo(
    () =>
      pixPayload({
        chave: evento.pix.chave,
        nomeRecebedor: evento.pix.nomeRecebedor,
        cidade: evento.pix.cidade,
        valor: total > 0 ? total : undefined,
      }),
    [total],
  );

  useEffect(() => {
    if (etapa !== "pix") return;
    let ativo = true;
    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(payload, {
        width: 480,
        margin: 1,
        color: { dark: "#3f2331", light: "#ffffff" },
        errorCorrectionLevel: "M",
      }).then((url) => {
        if (ativo) setQrDataUrl(url);
      });
    });
    return () => {
      ativo = false;
    };
  }, [etapa, payload]);

  function toggleEncontro(optionValue: string) {
    const encontro = evento.encontros.find((e) => e.optionValue === optionValue);
    if (!encontro || encontro.encerrado) return;
    setErro(null);
    setSelecionados((atual) =>
      atual.includes(optionValue)
        ? atual.filter((o) => o !== optionValue)
        : [...atual, optionValue],
    );
  }

  function formatarTelefone(valor: string) {
    const digitos = valor.replace(/\D/g, "").slice(0, 11);
    if (digitos.length <= 2) return digitos;
    if (digitos.length <= 7) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);

    if (nome.trim().length < 3) {
      setErro("Escreva seu nome completo, por favor.");
      return;
    }
    if (telefone.replace(/\D/g, "").length < 10) {
      setErro("Confira o número de WhatsApp — inclua o DDD.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErro("Confira o e-mail digitado, por favor.");
      return;
    }
    if (selecionados.length === 0) {
      setErro("Escolha pelo menos um encontro para participar.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.trim(),
          email: email.trim(),
          encontros: selecionados,
        }),
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as {
        ok?: boolean;
      };
      setRegistroOk(Boolean(data.ok));
    } catch {
      setRegistroOk(false);
    } finally {
      setEnviando(false);
      setEtapa("pix");
      // rola até o topo do card para mostrar a etapa de pagamento
      document
        .getElementById("inscricao")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  async function copiar(texto: string, tipo: "payload" | "chave") {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      const area = document.createElement("textarea");
      area.value = texto;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopiado(tipo);
    setTimeout(() => setCopiado(null), 2200);
  }

  const encontrosEscolhidos = evento.encontros.filter((e) =>
    selecionados.includes(e.optionValue),
  );

  const msgComprovante = `Olá, Marília! Acabei de me inscrever no *${evento.nome}* ☕\n\n*Nome:* ${nome.trim()}\n*Encontro(s):* ${encontrosEscolhidos.map((e) => `${e.data} — ${e.titulo}`).join(" · ")}\n*Total:* ${formatBRL(total)}\n\nSegue o comprovante do PIX:`;

  /* ============ ETAPA 2 — PAGAMENTO PIX ============ */
  if (etapa === "pix") {
    return (
      <div className="overflow-hidden rounded-[2rem] bg-cream shadow-lift">
        <div className="bg-plum-800 px-6 py-5 text-center sm:px-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-blush-300 uppercase">
            Etapa 2 de 2 · Pagamento
          </p>
          <h3 className="font-display mt-1 text-2xl font-semibold text-white">
            Quase lá, {nome.trim().split(" ")[0]}! 💗
          </h3>
        </div>

        <div className="p-6 sm:p-10">
          {registroOk === false && (
            <p className="mb-6 rounded-2xl bg-latte-100 px-4 py-3 text-sm text-latte-800">
              Não conseguimos registrar sua inscrição automaticamente, mas sem
              problema: ao enviar o comprovante no WhatsApp seus dados chegam
              junto. 😉
            </p>
          )}

          <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-start">
            <div className="mx-auto w-full max-w-[240px] text-center">
              <div className="rounded-3xl border border-blush-200 bg-white p-4 shadow-card">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt="QR Code do PIX para pagamento da inscrição"
                    className="h-auto w-full"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center text-sm text-ink-soft">
                    Gerando QR Code…
                  </div>
                )}
              </div>
              <p className="mt-3 text-xs text-ink-soft">
                Abra o app do seu banco e escaneie
              </p>
            </div>

            <div className="min-w-0">
              <div className="rounded-2xl bg-blush-50 p-5">
                <p className="text-sm font-semibold text-plum-900">
                  Resumo da inscrição
                </p>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {encontrosEscolhidos.map((e) => (
                    <li key={e.id} className="flex justify-between gap-4">
                      <span>
                        {e.data} · {e.titulo}
                      </span>
                      <span className="shrink-0 font-medium text-plum-800">
                        {formatBRL(evento.precoPorEncontro)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between border-t border-blush-200 pt-3 text-base font-bold text-plum-900">
                  <span>Total</span>
                  <span>{formatBRL(total)}</span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() => copiar(payload, "payload")}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-blush-200 bg-white px-5 py-4 text-left transition-colors hover:border-plum-400"
                >
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold tracking-wide text-ink-soft uppercase">
                      PIX copia e cola
                    </span>
                    <span className="block truncate text-sm text-plum-800">
                      {payload}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-blush-100 px-3 py-1.5 text-xs font-semibold text-plum-700">
                    {copiado === "payload" ? (
                      <>
                        <CheckIcon className="h-3.5 w-3.5" /> Copiado!
                      </>
                    ) : (
                      <>
                        <CopyIcon className="h-3.5 w-3.5" /> Copiar
                      </>
                    )}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => copiar(evento.pix.chaveDisplay.replace(/\D/g, ""), "chave")}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl border border-blush-200 bg-white px-5 py-4 text-left transition-colors hover:border-plum-400"
                >
                  <span>
                    <span className="block text-xs font-semibold tracking-wide text-ink-soft uppercase">
                      Ou use a chave celular
                    </span>
                    <span className="block text-sm font-medium text-plum-800">
                      {evento.pix.chaveDisplay} · {evento.pix.nomeRecebedor}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-blush-100 px-3 py-1.5 text-xs font-semibold text-plum-700">
                    {copiado === "chave" ? (
                      <>
                        <CheckIcon className="h-3.5 w-3.5" /> Copiado!
                      </>
                    ) : (
                      <>
                        <CopyIcon className="h-3.5 w-3.5" /> Copiar
                      </>
                    )}
                  </span>
                </button>
              </div>

              <div className="mt-6 rounded-2xl border-2 border-dashed border-blush-300 bg-blush-50/60 p-5 text-center">
                <p className="text-sm font-medium text-plum-900">
                  Pagou? Agora é só enviar o comprovante 👇
                </p>
                <a
                  href={whatsappUrl(msgComprovante)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift sm:w-auto"
                >
                  <WhatsAppIcon />
                  Enviar comprovante no WhatsApp
                </a>
                <p className="mt-3 text-xs text-ink-soft">
                  Sua vaga é confirmada assim que recebermos o comprovante. 💗
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEtapa("form")}
                className="mt-5 text-sm font-medium text-ink-soft underline-offset-4 hover:text-plum-700 hover:underline"
              >
                ← Voltar e editar minha inscrição
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ============ ETAPA 1 — DADOS ============ */
  return (
    <form
      onSubmit={enviar}
      className="overflow-hidden rounded-[2rem] bg-cream shadow-lift"
    >
      <div className="bg-plum-800 px-6 py-5 text-center sm:px-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-blush-300 uppercase">
          Etapa 1 de 2 · Seus dados
        </p>
        <h3 className="font-display mt-1 text-2xl font-semibold text-white">
          Garanta a sua vaga
        </h3>
      </div>

      <div className="space-y-5 p-6 sm:p-10">
        <div>
          <label
            htmlFor="nome"
            className="mb-1.5 block text-sm font-semibold text-plum-900"
          >
            Nome completo
          </label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Como você gostaria de ser chamada(o)?"
            autoComplete="name"
            className="w-full rounded-2xl border border-blush-200 bg-white px-5 py-3.5 text-plum-900 transition-colors outline-none placeholder:text-ink-soft/50 focus:border-plum-500 focus:ring-4 focus:ring-blush-200"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="telefone"
              className="mb-1.5 block text-sm font-semibold text-plum-900"
            >
              WhatsApp
            </label>
            <input
              id="telefone"
              type="tel"
              inputMode="tel"
              value={telefone}
              onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
              placeholder="(11) 90000-0000"
              autoComplete="tel"
              className="w-full rounded-2xl border border-blush-200 bg-white px-5 py-3.5 text-plum-900 transition-colors outline-none placeholder:text-ink-soft/50 focus:border-plum-500 focus:ring-4 focus:ring-blush-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-plum-900"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              autoComplete="email"
              className="w-full rounded-2xl border border-blush-200 bg-white px-5 py-3.5 text-plum-900 transition-colors outline-none placeholder:text-ink-soft/50 focus:border-plum-500 focus:ring-4 focus:ring-blush-200"
            />
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-plum-900">
            De qual(is) encontro(s) você quer participar?
            <span className="ml-2 font-normal text-ink-soft">
              ({formatBRL(evento.precoPorEncontro)} cada)
            </span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {evento.encontros.map((e) => {
              const ativo = selecionados.includes(e.optionValue);
              return (
                <label
                  key={e.id}
                  className={`flex items-start gap-3 rounded-2xl border-2 p-4 transition-all ${
                    e.encerrado
                      ? "cursor-not-allowed border-blush-100 bg-blush-50/40 opacity-60"
                      : ativo
                        ? "cursor-pointer border-plum-500 bg-blush-50 shadow-card"
                        : "cursor-pointer border-blush-200 bg-white hover:border-blush-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={ativo}
                    disabled={e.encerrado}
                    onChange={() => toggleEncontro(e.optionValue)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                      e.encerrado
                        ? "border-blush-200 bg-blush-100 text-transparent"
                        : ativo
                          ? "border-plum-600 bg-plum-600 text-white"
                          : "border-blush-300 bg-white text-transparent"
                    }`}
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  <span>
                    <span
                      className={`block text-xs font-bold tracking-wide uppercase ${
                        e.encerrado
                          ? "text-ink-soft/60 line-through"
                          : "text-rose-500"
                      }`}
                    >
                      {e.dataLonga}
                    </span>
                    <span
                      className={`mt-0.5 block text-sm leading-snug font-semibold ${
                        e.encerrado ? "text-ink-soft/70" : "text-plum-900"
                      }`}
                    >
                      {e.titulo}
                    </span>
                    {e.encerrado && (
                      <span className="mt-1.5 inline-flex items-center rounded-full bg-latte-100 px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-latte-800 uppercase">
                        Já aconteceu
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {erro && (
          <p
            role="alert"
            className="rounded-2xl bg-rose-300/25 px-4 py-3 text-sm font-medium text-plum-800"
          >
            {erro}
          </p>
        )}

        <div className="flex flex-col items-center gap-4 border-t border-blush-100 pt-5 sm:flex-row sm:justify-between">
          <p className="text-lg font-bold text-plum-900">
            Total:{" "}
            <span className={total > 0 ? "text-plum-600" : "text-ink-soft/60"}>
              {formatBRL(total)}
            </span>
            {selecionados.length > 0 && (
              <span className="ml-2 text-sm font-normal text-ink-soft">
                ({selecionados.length}{" "}
                {selecionados.length === 1 ? "encontro" : "encontros"})
              </span>
            )}
          </p>
          <button
            type="submit"
            disabled={enviando}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-plum-700 px-8 py-4 text-base font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-plum-800 hover:shadow-lift disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {enviando ? (
              "Enviando…"
            ) : (
              <>
                Continuar para o pagamento
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        <p className="text-center text-xs text-ink-soft">
          Seus dados são usados apenas para organizar o evento e não são
          compartilhados com terceiros.
        </p>
      </div>
    </form>
  );
}
