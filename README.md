# Marília Santos · Psicóloga — Site + Landing do Evento

Site institucional da psicóloga **Marília Santos** (CRP 06/110313) e landing page do
grupo terapêutico **"Vamos falar de amor?"** (parceria com o Kiki Café), com
inscrição integrada ao Google Forms e pagamento via **PIX** (QR Code + copia e cola).

## Páginas

| Rota | Descrição |
| --- | --- |
| `/` | Site institucional: atendimentos, sobre, quando buscar terapia, como funciona, FAQ e contato |
| `/evento` | Landing do evento: os 4 encontros, local, inscrição em 2 etapas e pagamento PIX |
| `/api/inscricao` | Recebe a inscrição e registra no Google Forms existente da Marília |

## Como rodar

```bash
npm install
npm run dev
```

## Onde editar os dados

Praticamente tudo que muda com frequência está em **`src/lib/site.ts`**:

- Telefone/WhatsApp, endereço e CRP
- Dados do evento: datas, temas, preço (`precoPorEncontro`), local
- **Chave PIX** (`evento.pix`) — hoje é a chave celular `(11) 99686-4135`
- IDs dos campos do Google Forms (`evento.entries`) — não alterar sem trocar o form

Textos das seções ficam em `src/app/page.tsx` (home) e `src/app/evento/page.tsx` +
`src/components/evento/InscricaoCard.tsx` (evento).

## Como funciona a inscrição do evento

1. A pessoa preenche nome, WhatsApp, e-mail e escolhe os encontros (total calculado na hora);
2. O site envia os dados para o **mesmo Google Forms/planilha que a Marília já usa** (via `/api/inscricao`);
3. Aparece o painel de pagamento com **QR Code PIX** no valor exato (BR Code padrão Bacen,
   gerado em `src/lib/pix.ts`) + botão de **copia e cola**;
4. A pessoa envia o comprovante pelo WhatsApp com mensagem pré-preenchida (nome,
   encontros e total) — e a Marília confirma a vaga.

> Se o Google Forms estiver fora do ar, o fluxo continua: os dados vão na mensagem
> do WhatsApp junto com o comprovante.

## Deploy

Deploy contínuo na **Vercel**: todo push na branch `main` publica automaticamente.

## Erro "Falha ao verificar seu navegador" no Instagram (Código 705)

**Sintoma:** ao abrir o link do site pelo navegador embutido do Instagram (ou de
outros apps, como Facebook/TikTok), aparece uma tela preta com
*"Ponto de verificação de segurança da Vercel"* e *"Falha ao verificar seu
navegador — Código 705"*. Em navegadores normais (Safari/Chrome) o site abre.

**Causa:** não é um bug do site. É o **Firewall da Vercel** servindo um desafio
de segurança antes da página — pelo **Bot Filter / Bot Protection** (que a
Vercel ativa por padrão em projetos novos) ou pelo **Attack Challenge Mode**.
Navegadores embutidos de apps não conseguem completar o desafio JavaScript e
ficam presos nessa tela. Nada no código dispara ou remove esse bloqueio — a
correção é uma configuração do projeto na Vercel.

**Correção (efeito imediato, sem precisar de redeploy):**

1. Acesse [vercel.com](https://vercel.com) → projeto **psico-marilia** → aba **Firewall**;
2. Se **Attack Challenge Mode** estiver ativado (botão no topo da página), **desative**;
3. Em **Configure** → seção **Bot Filter / Bot Management**: desative o desafio
   ou mude a ação de **Challenge** para **Log**;
4. Em **Custom Rules**, remova/ajuste qualquer regra com ação **Challenge**;
5. Salve/publique (**Save/Publish**) e teste abrindo o link por uma DM do Instagram.

Alternativa pelo terminal (requer login na conta Vercel):

```bash
npx vercel login
npx vercel link --yes --project psico-marilia
npx vercel firewall attack-mode disable --yes
```

## Domínio próprio (mariliasantospsicologa.com.br)

O domínio atual aponta para o Wix. Para usar este site no lugar:

1. Na Vercel: projeto → *Settings* → *Domains* → adicionar `mariliasantospsicologa.com.br` (e `www`);
2. No painel do Wix (ou registrador do domínio): apontar o DNS para a Vercel
   (registro `A` → `76.76.21.21` e `CNAME www` → `cname.vercel-dns.com`);
3. Aguardar a propagação (minutos a algumas horas) e depois cancelar o plano premium do Wix, se quiser.
