/**
 * Configuração central do site — edite aqui telefone, endereço, PIX e dados do evento.
 */

export const site = {
  nome: "Marília Santos",
  titulo: "Psicóloga Clínica",
  crp: "06/110313",
  /** Anos de experiência clínica — aparece na home e na landing do evento */
  anosExperiencia: 17,
  telefoneDisplay: "(11) 99686-4135",
  telefoneE164: "5511996864135",
  email: "",
  cidade: "São Paulo",
  endereco: {
    rua: "Rua Bom Pastor, 2224",
    bairro: "Ipiranga",
    cidadeUf: "São Paulo/SP",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Rua+Bom+Pastor%2C+2224+-+Ipiranga%2C+S%C3%A3o+Paulo+-+SP",
  },
  url: "https://www.mariliasantospsicologa.com.br",
};

export function whatsappUrl(mensagem: string): string {
  return `https://wa.me/${site.telefoneE164}?text=${encodeURIComponent(mensagem)}`;
}

export const mensagens = {
  agendar:
    "Olá, Marília! Vim pelo seu site e gostaria de agendar uma conversa. 😊",
  individual:
    "Olá, Marília! Vim pelo seu site e tenho interesse na terapia individual.",
  relacionamentos:
    "Olá, Marília! Vim pelo seu site e tenho interesse na terapia para relacionamentos.",
  grupos:
    "Olá, Marília! Vim pelo seu site e tenho interesse nos grupos terapêuticos.",
  duvidaEvento:
    'Olá! Tenho uma dúvida sobre o grupo "Vamos falar de amor?" ☕',
};

export type Encontro = {
  id: string;
  data: string;
  dataLonga: string;
  /** Data ISO (usada no schema.org do Google) */
  iso: string;
  titulo: string;
  pergunta: string;
  /** Valor exato da opção no Google Forms — não alterar */
  optionValue: string;
  /** Encontro que já aconteceu: aparece no site, mas sem inscrição */
  encerrado?: boolean;
};

export const evento = {
  nome: "Vamos falar de amor?",
  slug: "evento",
  descricaoCurta:
    "Grupo terapêutico sobre vínculos e formas de amar, conduzido pela psicóloga Marília Santos — 4 encontros no Kiki Café, em setembro e outubro.",
  precoPorEncontro: 65,
  local: "Kiki Café",
  sala: "Sala 1404",
  endereco: "Rua Bom Pastor, 2224 · Ipiranga – São Paulo/SP",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Bom+Pastor%2C+2224+-+Ipiranga%2C+S%C3%A3o+Paulo+-+SP",
  mes: "outubro",
  diaSemana: "quintas-feiras",
  horario: "19h às 20h30",
  duracao: "90 minutos",
  pix: {
    /** Chave PIX tipo celular, no formato exigido pelo BR Code */
    chave: "+5511996864135",
    chaveDisplay: "(11) 99686-4135",
    /**
     * Recebedor conforme o QR Code oficial do Bradesco — com estes dados o
     * payload gerado é idêntico ao do banco (+ valor embutido automaticamente).
     */
    nomeRecebedor: "MARILIA DA SILVA E SANTOS",
    cidade: "SAO PAULO",
  },
  /** Endpoint de envio do Google Forms já existente da Marília */
  formAction:
    "https://docs.google.com/forms/d/e/1FAIpQLSe-TL3V3_X5PTZr29fyyqfvSsRGn51f6huxC4xOe_U3WF4m5Q/formResponse",
  entries: {
    nome: "entry.1505072735",
    telefone: "entry.1562461962",
    email: "entry.1823395644",
    encontros: "entry.838914633",
  },
  /**
   * Datas dos encontros. Os `optionValue` são os rótulos originais das opções
   * do Google Forms e NÃO podem ser alterados — o formulário rejeita valores
   * fora da lista. Cada opção continua identificando o encontro pelo número e
   * pelo tema, mesmo quando a data do site muda.
   */
  encontros: [
    {
      id: "e1",
      data: "03/09",
      dataLonga: "3 de setembro",
      iso: "2026-09-03",
      titulo: "Por que amamos como amamos?",
      pergunta:
        "Onde aprendemos, pela primeira vez, o que significa amar e ser amado?",
      optionValue: "03/09 - Encontro 1 - Porque amamos como amamos",
      encerrado: true,
    },
    {
      id: "e2",
      data: "10/09",
      dataLonga: "10 de setembro",
      iso: "2026-09-10",
      titulo: "Quando o amor encontra o medo",
      pergunta:
        "Por que algumas relações despertam tanto medo, ansiedade ou necessidade de controle?",
      optionValue: "10/09 - Encontro 2 - Quando o amor encontra o medo",
      encerrado: true,
    },
    {
      id: "e3",
      data: "24/09",
      dataLonga: "24 de setembro",
      iso: "2026-09-24",
      titulo: "As histórias que levamos para o amor",
      pergunta: "O que carregamos conosco quando estamos em um relacionamento?",
      optionValue: "17/09 - Encontro 3 - As histórias que levamos para o amor",
      encerrado: true,
    },
    {
      id: "e4",
      data: "08/10",
      dataLonga: "8 de outubro",
      iso: "2026-10-08",
      titulo: "Amar de forma mais consciente",
      pergunta: "É possível amar sem deixar de ser quem somos?",
      optionValue: "24/09 - Encontro 4 - Amar de forma mais consciente",
    },
  ] satisfies Encontro[],
};

/** Encontros ainda disponíveis para inscrição (os que não aconteceram). */
export const encontrosDisponiveis = evento.encontros.filter((e) => !e.encerrado);

/** Ex.: "10/09 · 24/09 · 08/10" — ou "8 de outubro", se sobrar só um. */
export const datasDisponiveisDisplay =
  encontrosDisponiveis.length === 1
    ? encontrosDisponiveis[0].dataLonga
    : encontrosDisponiveis.map((e) => e.data).join(" · ");

export function formatBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
