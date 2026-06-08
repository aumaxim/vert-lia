import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SYSTEM = `Tu es un assistant utile et concis. Réponds en français, en 2 à 5 phrases maximum sauf si on te demande explicitement plus de détail.`;

type Msg = { role: 'user' | 'assistant'; content: string };

type AnthropicLikeResponse = {
  content?: { type: string; text: string }[];
  usage?: { input_tokens?: number; output_tokens?: number };
  error?: { message?: string };
};

export async function POST(req: Request) {
  const url = process.env.CHAT_API_URL;
  const token = process.env.CHAT_API_TOKEN;
  const model = process.env.CHAT_MODEL;

  if (!url || !token || !model) {
    return NextResponse.json(
      { error: 'Chat API not configured (CHAT_API_URL / CHAT_API_TOKEN / CHAT_MODEL).' },
      { status: 500 },
    );
  }

  let body: { history: Msg[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history : [];
  if (history.length === 0) {
    return NextResponse.json({ error: 'history is empty.' }, { status: 400 });
  }

  const payload = {
    model,
    max_tokens: 1024,
    system: SYSTEM,
    messages: history.map((m) => ({ role: m.role, content: m.content })),
  };

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Upstream network error', detail: String(e) },
      { status: 502 },
    );
  }

  const raw = await upstream.text();
  let data: AnthropicLikeResponse;
  try {
    data = JSON.parse(raw) as AnthropicLikeResponse;
  } catch {
    return NextResponse.json(
      { error: 'Upstream returned non-JSON', status: upstream.status, raw: raw.slice(0, 300) },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { error: data.error?.message || 'Upstream error', status: upstream.status },
      { status: upstream.status },
    );
  }

  const reply = data.content?.find((c) => c.type === 'text')?.text ?? '';
  if (!reply) {
    return NextResponse.json(
      { error: 'Empty reply from upstream', raw: raw.slice(0, 300) },
      { status: 502 },
    );
  }

  return NextResponse.json({
    reply,
    usage: data.usage ?? null,
  });
}
