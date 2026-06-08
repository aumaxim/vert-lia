export type ChatRole = 'user' | 'assistant';
export type Msg = { role: ChatRole; content: string };

export type ChatResult = {
  reply: string;
  usage: { input_tokens?: number; output_tokens?: number } | null;
};

// Next.js ne préfixe PAS les fetch() avec basePath (uniquement <Link>/router).
// Quand l'app tourne sous un sous-chemin (NEXT_PUBLIC_BASE_PATH=/projet-ing-maxime),
// il faut préfixer manuellement sinon le POST part sur la racine du domaine.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export async function sendMessage(history: Msg[]): Promise<ChatResult | null> {
  try {
    const res = await fetch(`${BASE_PATH}/api/chat`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ history }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ChatResult;
    if (!data.reply) return null;
    return data;
  } catch {
    return null;
  }
}
