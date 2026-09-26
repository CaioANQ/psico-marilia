import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import Reveal from "@/components/Reveal";
import { evento, formatBRL, mensagens, site, whatsappUrl } from "@/lib/site";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  CoffeeIcon,
  FlowerIcon,
  HeartIcon,
  MapPinIcon,
  VideoIcon,
  WhatsAppIcon,
} from "@/components/icons";

const servicos = [
  {
    titulo: "Terapia individual",
    duracao: "Sessões de 50 min",
    descricao:
      "Um espaço só seu, para compreender seus padrões, fortalecer sua autonomia emocional e se posicionar com mais clareza nas relações.",
    imagem: "/images/terapia-individual.jpg",
    alt: "Sessão de terapia individual em consultório acolhedor",
    mensagem: mensagens.individual,
  },
  {
    titulo: "Terapia para relacionamentos",
    duracao: "Sessões de 1h20",
    descricao:
      "Terapia de casal e de vínculos: para melhorar a comunicação, compreender os conflitos e construir uma relação mais consciente — juntos.",
    imagem: "/images/terapia-relacionamentos.jpg",
    alt: "Casal em sessão de terapia de casal conversando com a psicóloga",
    mensagem: mensagens.relacionamentos,
  },
  {
    titulo: "Grupos terapêuticos",
    duracao: "Encontros em grupo",
    descricao:
      "Espaço de troca e elaboração emocional, com foco em vínculos, pertencimento e nos padrões que repetimos ao amar.",
    imagem: "/images/grupo.jpg",
    alt: "Grupo terapêutico reunido em círculo conversando",
    mensagem: mensagens.grupos,
  },
];

const sinais = [
  "Você repete os mesmos padrões em relacionamentos diferentes",
  "Sente dependência emocional ou medo de ficar só",
  "Vive conflitos constantes com quem ama",
  "Tem dificuldade de se posicionar e dizer não",
  "Carrega términos e perdas que ainda doem",
  "Sente ansiedade, insegurança ou ciúme pesando na relação",
];

const passos = [
  {
    titulo: "Primeiro contato",
    texto:
      "Você me chama no WhatsApp e conta, sem compromisso, um pouco do que está vivendo e do que procura.",
  },
  {
    titulo: "Sessão inicial",
    texto:
      "Nos conhecemos, entendo sua história e alinhamos juntas(os) os objetivos do processo — com sigilo absoluto.",
  },
  {
    titulo: "Acompanhamento no seu ritmo",
    texto:
      "Sessões semanais, online ou presenciais no Ipiranga. Um processo construído com profundidade e respeito ao seu tempo.",
  },
];

const faqs = [
  {
    pergunta: "Como funciona a terapia online?",
    resposta:
      "As sessões acontecem por videochamada, em plataforma segura, com a mesma duração, sigilo e qualidade do atendimento presencial. Basta um lugar tranquilo e uma boa conexão — atendo pacientes de todo o Brasil.",
  },
  {
    pergunta: "Qual o valor das sessões?",
    resposta:
      "Os valores são informados no primeiro contato pelo WhatsApp, de acordo com a modalidade (individual ou para relacionamentos) e a frequência combinada. Me chama sem compromisso. 😊",
  },
  {
    pergunta: "Com que frequência acontecem as sessões?",
    resposta:
      "Em geral, as sessões são semanais — é o ritmo que permite continuidade e profundidade ao processo. A frequência ideal para o seu momento é combinada na sessão inicial.",
  },
  {
    pergunta: "A terapia é sigilosa?",
    resposta:
      "Sim, completamente. O sigilo é garantido pelo Código de Ética Profissional do Psicólogo e vale para tudo o que é compartilhado em sessão, no online e no presencial.",
  },
  {
    pergunta: "Terapia de casal funciona mesmo?",
    resposta:
      "A terapia para relacionamentos é um espaço neutro para que o casal compreenda seus padrões de comunicação e conflito. O objetivo não é apontar culpados, e sim construir uma relação mais consciente — o que, muitas vezes, transforma a forma de estar junto.",
  },
  {
    pergunta: "Onde ficam os atendimentos presenciais?",
    resposta: `No Ipiranga, em São Paulo — ${site.endereco.rua}. O consultório fica em região de fácil acesso, e também há a opção de atendimento 100% online.`,
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.pergunta,
    acceptedAnswer: { "@type": "Answer", text: f.resposta },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        {/* ===== HERO ===== */}
        <section className="wash grain relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <p className="inline-flex items-center gap-2 rounded-full border border-blush-300/60 bg-cream/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-plum-700 uppercase backdrop-blur">
                  <FlowerIcon className="h-3.5 w-3.5 text-rose-400" />
                  Psicóloga Clínica · CRP {site.crp}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-display mt-5 text-4xl leading-[1.08] font-semibold text-plum-900 sm:text-5xl lg:text-[3.4rem]">
                  Psicoterapia para relações mais{" "}
                  <em className="text-plum-600 not-italic underline decoration-rose-300 decoration-4 underline-offset-8">
                    conscientes
                  </em>{" "}
                  e saudáveis
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                  Um espaço de escuta para compreender seus padrões afetivos,
                  fortalecer sua autonomia emocional e construir vínculos mais
                  seguros — com os outros e com você.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={whatsappUrl(mensagens.agendar)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-plum-700 px-7 py-4 text-base font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-plum-800 hover:shadow-lift"
                  >
                    <WhatsAppIcon />
                    Agendar uma conversa
                  </a>
                  <Link
                    href="#atendimentos"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-plum-300/50 bg-cream/70 px-7 py-4 text-base font-semibold text-plum-700 backdrop-blur transition-colors hover:bg-blush-50"
                  >
                    Conhecer os atendimentos
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={320}>
                <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
                  <li className="inline-flex items-center gap-2">
                    <HeartIcon className="h-4 w-4 text-rose-400" />
                    +{site.anosExperiencia} anos de experiência clínica
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <VideoIcon className="h-4 w-4 text-rose-400" />
                    Online para todo o Brasil
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-rose-400" />
                    Presencial no Ipiranga · SP
                  </li>
                </ul>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative mx-auto w-full max-w-sm lg:max-w-md">
              <div
                aria-hidden
                className="float-slow absolute -top-8 -right-6 h-28 w-28 rounded-full bg-lilac-200/70 blur-2xl"
              />
              <div
                aria-hidden
                className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-rose-300/50 blur-3xl"
              />
              <div className="arch relative overflow-hidden border-8 border-cream shadow-lift">
                <Image
                  src="/images/marilia.jpg"
                  alt="Marília Santos, psicóloga clínica"
                  width={520}
                  height={620}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-cream px-5 py-2.5 shadow-card">
                <p className="text-sm font-semibold text-plum-800">
                  Marília Santos
                  <span className="ml-2 font-normal text-ink-soft">
                    Psicóloga · CRP {site.crp}
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== ATENDIMENTOS ===== */}
        <section id="atendimentos" className="scroll-mt-24 bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-rose-500 uppercase">
                Atendimentos
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold text-plum-900 sm:text-4xl">
                Como posso te acompanhar
              </h2>
              <p className="mt-4 text-lg text-ink-soft">
                Cada história pede um cuidado. Os atendimentos acontecem
                presencialmente no Ipiranga ou online, sempre com escuta,
                profundidade e respeito ao seu tempo.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {servicos.map((s, i) => (
                <Reveal
                  key={s.titulo}
                  delay={i * 100}
                  className="group flex flex-col overflow-hidden rounded-3xl bg-porcelain shadow-card transition-all hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.imagem}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold text-plum-700 backdrop-blur">
                      <ClockIcon className="h-3.5 w-3.5" />
                      {s.duracao}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-semibold text-plum-900">
                      {s.titulo}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                      {s.descricao}
                    </p>
                    <a
                      href={whatsappUrl(s.mensagem)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-plum-600 transition-colors hover:text-plum-800"
                    >
                      Agendar pelo WhatsApp
                      <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SOBRE ===== */}
        <section id="sobre" className="scroll-mt-24 overflow-hidden py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden
                className="absolute -top-6 -left-6 h-full w-full rounded-[2rem] bg-blush-200"
              />
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="/images/marilia.jpg"
                  alt="Marília Santos sorrindo"
                  width={480}
                  height={560}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -right-4 -bottom-6 rounded-2xl bg-cream p-4 shadow-card sm:-right-8">
                <p className="font-display text-3xl font-semibold text-plum-700">
                  +{site.anosExperiencia}
                </p>
                <p className="text-xs text-ink-soft">
                  anos de
                  <br />
                  experiência
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="text-sm font-semibold tracking-[0.18em] text-rose-500 uppercase">
                  Quem te acompanha
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-plum-900 sm:text-4xl">
                  Cuidar das relações é, muitas vezes, cuidar de si.
                </h2>
              </Reveal>
              <Reveal delay={100}>
                <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
                  <p>
                    Sou a Marília, psicóloga clínica no Ipiranga, em São Paulo.
                    Atendo pessoas que desejam compreender e transformar suas
                    formas de amar, se vincular e se posicionar nas relações —
                    sejam elas afetivas, familiares ou consigo mesmas.
                  </p>
                  <p>
                    Questões como dependência emocional, dificuldades nos
                    relacionamentos, padrões repetitivos e conflitos ligados ao
                    amor e ao pertencimento podem ser trabalhadas com
                    profundidade e respeito ao seu tempo.
                  </p>
                  <p className="font-medium text-plum-800">
                    A psicoterapia é um espaço de escuta, construção e mudança.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <ul className="mt-8 space-y-3">
                  {[
                    "Graduação em Psicologia — Universidade São Marcos (2010)",
                    "Especialização em Psicologia da Saúde e Hospitalar — PUC-SP",
                    "Pós-graduação em Terapia Cognitivo-Comportamental — PUC-RS",
                    "Formação complementar em Coaching Ontológico",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blush-200 text-plum-700">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="text-ink-soft">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ===== SINAIS ===== */}
        <section className="bg-plum-900 py-20 text-blush-100 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
              <Reveal>
                <p className="text-sm font-semibold tracking-[0.18em] text-rose-300 uppercase">
                  Quando buscar terapia?
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  Se algo aqui parece a sua história, você não está só.
                </h2>
                <p className="mt-5 leading-relaxed text-blush-200/85">
                  Muitas vezes seguimos repetindo roteiros que nos fazem sofrer
                  — não por falta de vontade de mudar, mas porque ainda não
                  tivemos espaço para compreendê-los. A terapia é esse espaço.
                </p>
                <a
                  href={whatsappUrl(mensagens.agendar)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-semibold text-plum-800 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Quero dar o primeiro passo
                </a>
              </Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {sinais.map((s, i) => (
                  <Reveal
                    key={s}
                    as="li"
                    delay={i * 70}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  >
                    <HeartIcon className="h-5 w-5 text-rose-300" />
                    <p className="mt-3 text-[0.95rem] leading-snug text-blush-100">
                      {s}
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== COMO FUNCIONA ===== */}
        <section id="como-funciona" className="scroll-mt-24 bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold tracking-[0.18em] text-rose-500 uppercase">
                Como funciona
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold text-plum-900 sm:text-4xl">
                Começar é mais simples do que parece
              </h2>
            </Reveal>
            <div className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              <div
                aria-hidden
                className="absolute top-7 right-[16%] left-[16%] hidden border-t-2 border-dashed border-blush-300 md:block"
              />
              {passos.map((p, i) => (
                <Reveal key={p.titulo} delay={i * 120} className="relative text-center">
                  <div className="font-display relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-plum-700 text-xl font-semibold text-white shadow-card">
                    {i + 1}
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold text-plum-900">
                    {p.titulo}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink-soft">
                    {p.texto}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== BANNER EVENTO ===== */}
        <section className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Reveal className="wash-event grain relative overflow-hidden rounded-[2.5rem] px-6 py-12 shadow-soft sm:px-12 sm:py-16">
              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full bg-cream/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-latte-800 uppercase backdrop-blur">
                    <CoffeeIcon className="h-4 w-4" />
                    Grupo terapêutico · {evento.mes} · {evento.local}
                  </p>
                  <h2 className="font-display mt-4 text-3xl font-semibold text-plum-900 sm:text-4xl lg:text-[2.6rem]">
                    {evento.nome}
                  </h2>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
                    4 encontros para compreender por que amamos como amamos —
                    em um ambiente acolhedor, intimista e com um bom café.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-plum-800">
                    <span className="inline-flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-latte-600" />
                      Quintas de {evento.mes}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-latte-600" />
                      {evento.horario}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <HeartIcon className="h-4 w-4 text-latte-600" />
                      {formatBRL(evento.precoPorEncontro)} por encontro
                    </span>
                  </div>
                </div>
                <div className="flex lg:justify-end">
                  <Link
                    href="/evento"
                    className="group inline-flex items-center gap-3 rounded-full bg-plum-700 px-8 py-4 text-base font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-plum-800 hover:shadow-lift"
                  >
                    Conhecer o evento e se inscrever
                    <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section id="duvidas" className="scroll-mt-24 bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <Reveal className="text-center">
              <p className="text-sm font-semibold tracking-[0.18em] text-rose-500 uppercase">
                Dúvidas frequentes
              </p>
              <h2 className="font-display mt-3 text-3xl font-semibold text-plum-900 sm:text-4xl">
                O que você precisa saber antes de começar
              </h2>
            </Reveal>
            <div className="mt-10 space-y-3">
              {faqs.map((f, i) => (
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
          </div>
        </section>

        {/* ===== CONTATO ===== */}
        <section id="contato" className="wash grain relative scroll-mt-24 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal>
                <p className="text-sm font-semibold tracking-[0.18em] text-rose-500 uppercase">
                  Contato
                </p>
                <h2 className="font-display mt-3 text-3xl font-semibold text-plum-900 sm:text-4xl">
                  O primeiro passo pode ser uma simples mensagem
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                  Me conte um pouco do que você está vivendo. Vou te responder
                  pessoalmente para conversarmos sobre o melhor caminho para o
                  seu momento.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={whatsappUrl(mensagens.agendar)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-plum-700 px-7 py-4 text-base font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-plum-800 hover:shadow-lift"
                  >
                    <WhatsAppIcon />
                    Chamar no WhatsApp
                  </a>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="rounded-3xl bg-cream p-7 shadow-soft sm:p-9">
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blush-100 text-plum-700">
                        <WhatsAppIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-plum-900">WhatsApp</p>
                        <a
                          href={whatsappUrl(mensagens.agendar)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-soft hover:text-plum-700"
                        >
                          {site.telefoneDisplay}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blush-100 text-plum-700">
                        <MapPinIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-plum-900">
                          Consultório
                        </p>
                        <p className="text-ink-soft">
                          {site.endereco.rua} · {site.endereco.bairro}
                          <br />
                          {site.endereco.cidadeUf}
                        </p>
                        <a
                          href={site.endereco.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-plum-600 hover:text-plum-800"
                        >
                          Como chegar
                          <ArrowRightIcon className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blush-100 text-plum-700">
                        <VideoIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-plum-900">
                          Atendimento online
                        </p>
                        <p className="text-ink-soft">
                          Para todo o Brasil, por videochamada segura.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
