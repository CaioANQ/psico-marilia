import { NextResponse } from "next/server";
import { evento } from "@/lib/site";

export const runtime = "nodejs";

type Body = {
  nome?: string;
  telefone?: string;
  email?: string;
  encontros?: string[];
};

/**
 * Recebe a inscrição do site e registra no Google Forms já existente da
 * Marília (as respostas continuam caindo na planilha que ela já usa).
 */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const nome = (body.nome ?? "").trim();
  const telefone = (body.telefone ?? "").trim();
  const email = (body.email ?? "").trim();
  const encontros = Array.isArray(body.encontros) ? body.encontros : [];

  const validOptions = new Set(evento.encontros.map((e) => e.optionValue));
  const selecionados = encontros.filter((e) => validOptions.has(e));

  if (!nome || !telefone || !email || selecionados.length === 0) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.append(evento.entries.nome, nome);
  params.append(evento.entries.telefone, telefone);
  params.append(evento.entries.email, email);
  for (const opcao of selecionados) {
    params.append(evento.entries.encontros, opcao);
  }

  try {
    const res = await fetch(evento.formAction, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
      redirect: "follow",
    });

    const html = await res.text();
    // A página de confirmação do Google não contém <form>; quando a
    // validação falha, o formulário inteiro é re-renderizado.
    const ok = res.ok && !html.includes("<form");

    return NextResponse.json({ ok });
  } catch {
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
