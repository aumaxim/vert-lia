import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SYSTEM = `Tu es l'assistant de démonstration de « Vert l'IA ? », un site sur le coût caché (énergie, CO₂, eau) de l'intelligence artificielle. Réponds en français, de façon claire et concise (2 à 5 phrases sauf demande explicite de plus de détail). Tu es toi-même une IA qui tourne : oriente tes réponses autour de la consommation de l'IA. Renvoie vers les sections du site (Comprendre, Comparer, Calculateur, Sources) pour le détail.

CHIFFRES OFFICIELS DU SITE — utilise EXACTEMENT ces ordres de grandeur, ne les invente pas :
- Requête texte IA (≈300 tokens) : ~0,3 Wh d'énergie, ~2 g de CO₂, ~0,5 cL d'eau
- Image IA générée : ~5 Wh (jusqu'à 11 Wh pour un grand modèle), ~5 g de CO₂, ~3 cL d'eau
- Vidéo IA de 5 secondes (type Sora) : ~1 000 Wh (= 1 kWh), ~400 g de CO₂, ~5 L d'eau
- Recherche web classique : ~0,03 Wh (≈10× moins qu'une requête IA texte)
- Équivalences : 1 charge de smartphone = 15 Wh ; 1 km en voiture thermique ≈ 170 g de CO₂ ; 1 ampoule LED = 8 W
- À l'échelle planète : ~2 % de l'électricité mondiale pour les data centers, ~1 milliard de requêtes ChatGPT par jour, 60-90 % de l'énergie de l'IA vient de l'usage (inférence) pas de l'entraînement

Si tu n'es pas sûr d'un chiffre, dis-le et renvoie vers la page Sources. Ne donne JAMAIS des kWh quand il s'agit de Wh, ni des kg quand il s'agit de g.`;

type Msg = { role: 'user' | 'assistant'; content: string };

type OpenAILikeResponse = {
  choices?: {
    message?: { role?: string; content?: string };
    finish_reason?: string;
  }[];
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  error?: { message?: string; code?: number | string; type?: string };
};

type CallResult =
  | { ok: true; data: OpenAILikeResponse }
  | { ok: false; status: number; data: OpenAILikeResponse | null; raw: string };

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function callOpenRouter(
  model: string,
  key: string,
  payload: unknown,
  maxAttempts: number,
): Promise<CallResult> {
  let lastStatus = 0;
  let lastRaw = '';
  let lastData: OpenAILikeResponse | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let res: Response;
    try {
      res = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${key}`,
          'HTTP-Referer': 'https://vert-lia.local',
          'X-Title': "Vert l'IA ?",
        },
        body: JSON.stringify({ ...(payload as object), model }),
      });
    } catch {
      return { ok: false, status: 0, data: null, raw: 'network error' };
    }

    lastStatus = res.status;
    lastRaw = await res.text();
    try {
      lastData = JSON.parse(lastRaw) as OpenAILikeResponse;
    } catch {
      lastData = null;
    }

    if (res.ok) return { ok: true, data: lastData ?? {} };

    // 502/503/504 → transient upstream; 429 → rate limit (also transient)
    const transient =
      res.status === 502 || res.status === 503 || res.status === 504 || res.status === 429;
    if (!transient || attempt === maxAttempts - 1) {
      return { ok: false, status: res.status, data: lastData, raw: lastRaw };
    }

    await new Promise((r) => setTimeout(r, 500 + attempt * 1000));
  }

  return { ok: false, status: lastStatus, data: lastData, raw: lastRaw };
}

export async function POST(req: Request) {
  const key = process.env.CHAT_API_KEY;
  const primary = process.env.CHAT_MODEL || 'openai/gpt-oss-120b:free';
  const fallback = process.env.CHAT_MODEL_FALLBACK || 'openai/gpt-oss-20b:free';

  if (!key) {
    return NextResponse.json(
      { error: 'Chat API not configured (CHAT_API_KEY missing).' },
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

  const messages = [
    { role: 'system', content: SYSTEM },
    ...history.map((m) => ({ role: m.role, content: m.content })),
  ];

  const payload = {
    messages,
    max_tokens: 1024,
  };

  // Primary model — 2 attempts with backoff
  let result = await callOpenRouter(primary, key, payload, 2);

  // Fallback model — 1 attempt if primary kept failing transiently
  const transientFail =
    !result.ok &&
    (result.status === 429 ||
      result.status === 502 ||
      result.status === 503 ||
      result.status === 504);
  if (transientFail && fallback && fallback !== primary) {
    result = await callOpenRouter(fallback, key, payload, 1);
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.data?.error?.message || 'Upstream error',
        status: result.status,
      },
      { status: result.status || 502 },
    );
  }

  const reply = result.data.choices?.[0]?.message?.content ?? '';
  if (!reply) {
    return NextResponse.json({ error: 'Empty reply from upstream' }, { status: 502 });
  }

  const usage = result.data.usage
    ? {
        input_tokens: result.data.usage.prompt_tokens,
        output_tokens: result.data.usage.completion_tokens,
      }
    : null;

  return NextResponse.json({ reply, usage });
}
