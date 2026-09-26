import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import InscricaoCard from "@/components/evento/InscricaoCard";
import {
  datasDisponiveisDisplay,
  encontrosDisponiveis,
  evento,
  formatBRL,
  mensagens,
  site,
  whatsappUrl,
} from "@/lib/site";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  CoffeeIcon,
  FlowerIcon,
  HeartIcon,
  MapPinIcon,
  WhatsAppIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Vamos falar de amor? ☕ Grupo terapêutico no Kiki Café · Ipiranga",
  description: `${evento.descricaoCurta} Inscrição rápida e pagamento por PIX.`,
  alternates: { canonical: "/evento" },
  openGraph: {
    title: "Vamos falar de amor? ☕",
    url: "/evento",
    description: evento.descricaoCurta,
    images: [{ url: "/images/evento-banner.png", width: 1983, height: 496 }],
  },
};

const eventoJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: evento.nome,
          item: `${site.url}/evento`,
        },
      ],
    },
    // Apenas os encontros que ainda vão acontecer — encontros já realizados
    // não devem aparecer como eventos disponíveis nos resultados de busca.
    ...encontrosDisponiveis.map((e) => ({
      "@type": "Event",
      name: `${evento.nome} — Encontro ${evento.encontros.indexOf(e) + 1}: ${e.titulo}`,
      description: `${e.pergunta} Grupo terapêutico conduzido pela psicóloga Marília Santos (CRP 06/110313), no ${evento.local}, Ipiranga — São Paulo.`,
      startDate: `${e.iso}T19:00:00-03:00`,
      endDate: `${e.iso}T20:30:00-03:00`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: `${site.url}/images/evento-banner.png`,
      inLanguage: "pt-BR",
      location: {
        "@type": "Place",
        name: `${evento.local} — ${evento.sala}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Rua Bom Pastor, 2224 — Sala 1404",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
      organizer: {
        "@type": "Person",
        name: "Marília Santos — Psicóloga Clínica",
        url: site.url,
      },
      performer: { "@type": "Person", name: "Marília Santos" },
      offers: {
        "@type": "Offer",
        price: evento.precoPorEncontro.toFixed(2),
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
        url: `${site.url}/evento`,
        validFrom: "2026-08-10",
      },
    })),
  ],
};

const paraQuem = [
  "Sente que seus relacionamentos seguem sempre o mesmo roteiro",
  "Quer entender por que se aproxima de determinadas pessoas",
  "Já permaneceu em relações que faziam sofrer — e quer compreender o porquê",
  "Deseja construir vínculos mais conscientes e saudáveis",
  "Gosta de trocar experiências em um ambiente acolhedor (com um bom café ☕)",
];

const comoParticipar = [
  {
    titulo: "Preencha a inscrição",
    texto: "Leva menos de um minuto — nome, contato e os encontros que você quer viver.",
  },
  {
    titulo: "Pague via PIX",
    texto: "O QR Code aparece na hora, já com o valor certinho da sua escolha.",
  },
  {
    titulo: "Envie o comprovante",
    texto: "Mande no WhatsApp e pronto: sua vaga está confirmada. 💗",
  },
];

const faqsEvento = [
  {
    pergunta: "Posso participar de apenas um encontro?",
    resposta: `Sim! Cada encontro custa ${formatBRL(evento.precoPorEncontro)} e tem tema próprio. Mas os quatro se complementam — participar da jornada completa potencializa a experiência.`,
  },
  {
    pergunta: "Preciso já ter feito terapia antes?",
    resposta:
      "Não. O grupo é aberto a qualquer pessoa interessada em compreender melhor sua forma de amar — solteira, namorando ou casada. Não é preciso nenhuma experiência prévia.",
  },
  {
    pergunta: "É terapia em grupo?",
    resposta:
      "É um grupo terapêutico de reflexão conduzido por psicóloga, com atividades e discussões baseadas na Psicologia. É um espaço de escuta e troca — e não substitui a psicoterapia individual.",
  },
  {
    pergunta: "E se eu pagar e não puder ir em uma data?",
    resposta:
      "Sem estresse: me chama no WhatsApp que encontramos juntas(os) a melhor solução.",
  },
  {
    pergunta: "Como funciona o pagamento?",
    resposta:
      "O pagamento é por PIX, no valor total dos encontros escolhidos. A vaga é confirmada quando você envia o comprovante pelo WhatsApp.",
  },
];

export default function EventoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventoJsonLd) }}
      />
      {/* Header enxuto da landing */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Logo Marília Santos Psicóloga"
              width={44}
              height={44}
              className="h-11 w-11"
              priority
            />
            <span className="leading-tight">
              <span className="font-display block text-lg font-semibold text-plum-800">
                Marília Santos
              </span>
              <span className="block text-[0.68rem] tracking-[0.14em] text-ink-soft uppercase">
                Psicóloga · CRP {site.crp}
              </span>
            </span>
          </Link>
          <a
            href="#inscricao"
            className="hidden items-center gap-2 rounded-full bg-plum-700 px-6 py-3 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-plum-800 sm:inline-flex"
          >
            Quero me inscrever
          </a>
        </div>
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section className="wash-event grain relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
          <div
            aria-hidden
            className="float-slow absolute top-24 right-[8%] hidden text-latte-600/40 lg:block"
          >
            <CoffeeIcon className="h-20 w-20" />
          </div>
          <div
            aria-hidden
            className="absolute bottom-10 left-[6%] hidden text-rose-300/50 lg:block"
          >
            <FlowerIcon className="h-16 w-16" />
          </div>

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-latte-200 bg-cream/80 px-5 py-2 text-xs font-semibold tracking-wide text-latte-800 uppercase backdrop-blur">
                <CoffeeIcon className="h-4 w-4" />
                Grupo terapêutico · 4 encontros · {evento.local}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="font-display mt-6 text-5xl leading-[1.02] font-semibold text-plum-900 sm:text-6xl lg:text-7xl">
                Vamos falar
                <br />
                de <em className="text-plum-600 not-italic underline decoration-rose-300 decoration-8 underline-offset-[10px]">amor</em>?
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
                Você já se perguntou por que alguns relacionamentos parecem
                seguir sempre o mesmo roteiro? Em 4 encontros — em um ambiente
                acolhedor, intimista e com um bom café — vamos refletir sobre
                nossas histórias, crenças e experiências afetivas.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-plum-800">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2.5 shadow-card">
                  <CalendarIcon className="h-4 w-4 text-latte-600" />
                  {datasDisponiveisDisplay}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2.5 shadow-card">
                  <ClockIcon className="h-4 w-4 text-latte-600" />
                  Quintas · {evento.horario}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2.5 shadow-card">
                  <MapPinIcon className="h-4 w-4 text-latte-600" />
                  {evento.local} · Ipiranga
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-plum-700 px-4 py-2.5 text-white shadow-card">
                  <HeartIcon className="h-4 w-4" />
                  {formatBRL(evento.precoPorEncontro)} por encontro
                </span>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <a
                href="#inscricao"
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-plum-700 px-9 py-4.5 text-lg font-bold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-plum-800"
              >
                Garantir minha vaga
                <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="mt-4 text-sm text-ink-soft">
                Vagas limitadas — o grupo é intimista de propósito. 😉
              </p>
            </Reveal>
          </div>

          {/* Banner oficial do evento */}
          <div className="mx-auto mt-12 max-w-5xl px-4 sm:mt-16 sm:px-6">
            <Reveal delay={420}>
              <Image
                src="/images/evento-banner.png"
                alt="Convite oficial do evento Vamos falar de amor? — um encontro para compreender, ressignificar e transformar a forma como amamos, com café e quitutes"
                width={1983}
                height={496}
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 976px"
                className="w-full rounded-2xl border-4 border-cream shadow-lift sm:rounded-[1.75rem] sm:border-8"
              />
            </Reveal>
          </div>
        </section>

        {/* ===== PARA QUEM ===== */}
        <section className="bg-cream py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <Reveal className="relative order-2 lg:order-1">
              <div
                aria-hidden
                className="absolute -top-5 -left-5 h-full w-full rounded-[2rem] bg-latte-100"
              />
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="/images/grupo.jpg"
                  alt="Grupo de pessoas conversando em círculo, em ambiente acolhedor"
                  width={1400}
                  height={933}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <p className="text-sm font-semibold tracking-[0.18em] text-latte-600 uppercase">
                  Esse grupo é pra você que…
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-plum-900 sm:text-4xl">
                  Compreender a própria forma de amar muda tudo
                </h2>
              </Reveal>
              <ul className="mt-8 space-y-4">
                {paraQuem.map((item, i) => (
                  <Reveal key={item} as="li" delay={i * 80} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush-200 text-plum-700">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <p className="leading-relaxed text-ink-soft">{item}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== OS 4 ENCONTROS ===== */}
        <section className="bg-plum-900 py-20 text-blush-100 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-[0.18em] text-rose-300 uppercase">
                A jornada
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
                O que veremos em cada encontro
              </h2>
              <p className="mt-4 text-blush-200/85">
                Atividades, discussões e reflexões baseadas na Psicologia —
                conduzidas pela psicóloga Marília Santos.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {evento.encontros.map((e, i) => (
                <Reveal
                  key={e.id}
                  delay={i * 90}
                  className={`group relative overflow-hidden rounded-3xl border p-7 backdrop-blur-sm transition-colors ${
                    e.encerrado
                      ? "border-white/5 bg-white/[0.02]"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`font-display absolute -top-3 -right-1 text-[7rem] leading-none font-bold transition-colors ${
                      e.encerrado
                        ? "text-white/[0.03]"
                        : "text-white/5 group-hover:text-white/10"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide uppercase ${
                        e.encerrado
                          ? "bg-white/5 text-blush-200/45 line-through"
                          : "bg-rose-300/15 text-rose-300"
                      }`}
                    >
                      <CoffeeIcon className="h-3.5 w-3.5" />
                      Encontro {i + 1} · {e.dataLonga}
                    </p>
                    {e.encerrado && (
                      <span className="inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-[0.7rem] font-bold tracking-wide text-blush-200/60 uppercase">
                        Já aconteceu
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-display mt-4 text-2xl font-semibold ${
                      e.encerrado ? "text-white/40" : "text-white"
                    }`}
                  >
                    {e.titulo}
                  </h3>
                  <p
                    className={`mt-3 leading-relaxed ${
                      e.encerrado ? "text-blush-200/40" : "text-blush-200/85"
                    }`}
                  >
                    {e.pergunta}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== QUEM CONDUZ + LOCAL ===== */}
        <section className="bg-cream py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-2">
            <Reveal className="flex flex-col gap-6 rounded-[2rem] bg-porcelain p-8 shadow-card sm:flex-row sm:items-center sm:p-9">
              <Image
                src="/images/marilia.jpg"
                alt="Psicóloga Marília Santos"
                width={160}
                height={160}
                className="h-32 w-32 shrink-0 rounded-3xl object-cover shadow-card"
              />
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-rose-500 uppercase">
                  Quem conduz
                </p>
                <h3 className="font-display mt-2 text-2xl font-semibold text-plum-900">
                  Marília Santos
                </h3>
                <p className="mt-1 text-sm font-medium text-ink-soft">
                  Psicóloga Clínica · CRP {site.crp}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Há mais de {site.anosExperiencia} anos acompanhando pessoas
                  em suas formas de amar, se vincular e se posicionar nas
                  relações.
                </p>
                <Link
                  href="/"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum-600 hover:text-plum-800"
                >
                  Conhecer o trabalho da Marília
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100} className="wash-event grain relative overflow-hidden rounded-[2rem] p-8 shadow-card sm:p-9">
              <p className="text-xs font-semibold tracking-[0.18em] text-latte-800 uppercase">
                O lugar
              </p>
              <h3 className="font-display mt-2 flex items-center gap-2 text-2xl font-semibold text-plum-900">
                <CoffeeIcon className="h-6 w-6 text-latte-600" />
                {evento.local}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-soft">
                Um café acolhedor e intimista no coração do Ipiranga — o cenário
                perfeito para boas conversas sobre o amor.
              </p>
              <p className="mt-4 text-sm font-medium text-plum-800">
                {evento.endereco.split("·")[0]} · {evento.sala}
                <br />
                Ipiranga – São Paulo/SP
              </p>
              <a
                href={evento.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-plum-700 shadow-card transition-all hover:-translate-y-0.5"
              >
                <MapPinIcon className="h-4 w-4" />
                Ver no mapa
              </a>
            </Reveal>
          </div>
        </section>

        {/* ===== COMO PARTICIPAR + INSCRIÇÃO ===== */}
        <section id="inscricao" className="wash-event grain relative scroll-mt-6 overflow-hidden py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <Reveal className="text-center">
              <p className="text-sm font-semibold tracking-[0.18em] text-latte-800 uppercase">
                Inscrição
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold text-plum-900 sm:text-4xl">
                Como participar
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {comoParticipar.map((p, i) => (
                <Reveal key={p.titulo} delay={i * 100} className="rounded-3xl bg-cream/80 p-6 text-center shadow-card backdrop-blur">
                  <div className="font-display mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-plum-700 text-lg font-semibold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mt-4 font-semibold text-plum-900">{p.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.texto}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={150} className="mt-10">
              <InscricaoCard />
            </Reveal>

            <Reveal className="mt-8 text-center">
              <p className="text-sm text-ink-soft">
                Alguma dúvida antes de se inscrever?{" "}
                <a
                  href={whatsappUrl(mensagens.duvidaEvento)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-plum-700 underline decoration-rose-300 decoration-2 underline-offset-4 hover:text-plum-900"
                >
                  Chama a gente no WhatsApp
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== FAQ EVENTO ===== */}
        <section className="bg-cream py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal className="text-center">
              <h2 className="font-display text-3xl font-semibold text-plum-900 sm:text-4xl">
                Perguntas frequentes
              </h2>
            </Reveal>
            <div className="mt-10 space-y-3">
              {faqsEvento.map((f, i) => (
                <Reveal key={f.pergunta} delay={i * 60}>
                  <details className="faq group rounded-2xl border border-blush-200 bg-porcelain px-6 py-1 transition-colors open:bg-blush-50">
                    <summary className="flex items-center justify-between gap-4 py-4">
                      <span className="font-display text-lg font-medium text-plum-900">
                        {f.pergunta}
                      </span>
                      <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush-200 text-lg font-medium text-plum-700">
                        +
                      </span>
                    </summary>
                    <p className="pb-5 leading-relaxed text-ink-soft">
                      {f.resposta}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14 rounded-[2rem] bg-plum-900 p-8 text-center text-blush-100 sm:p-10">
              <HeartIcon className="mx-auto h-8 w-8 text-rose-300" />
              <p className="font-display mx-auto mt-4 max-w-xl text-2xl font-medium text-white">
                Se você sente que é hora de compreender melhor a sua forma de
                amar, esse espaço foi feito para você.
              </p>
              <a
                href="#inscricao"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-8 py-4 text-base font-bold text-plum-800 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
              >
                Quero me inscrever
                <ArrowRightIcon className="h-5 w-5" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer compacto */}
      <footer className="bg-plum-900 py-8 text-center text-sm text-blush-200/80">
        <p>
          <span className="font-display font-semibold text-white">
            Marília Santos
          </span>{" "}
          · Psicóloga Clínica · CRP {site.crp}
        </p>
        <p className="mt-1">
          Uma parceria com o {evento.local} ☕ ·{" "}
          <Link href="/" className="underline underline-offset-4 hover:text-white">
            mariliasantospsicologa.com.br
          </Link>
        </p>
        <a
          href={whatsappUrl(mensagens.duvidaEvento)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-blush-200/80 hover:text-white"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {site.telefoneDisplay}
        </a>
      </footer>
    </>
  );
}
