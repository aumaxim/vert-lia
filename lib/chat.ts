export type ChatRole = 'user' | 'assistant';
export type Msg = { role: ChatRole; content: string };

export type ChatResult = {
  reply: string;
  usage: { input_tokens?: number; output_tokens?: number } | null;
};

export async function sendMessage(history: Msg[]): Promise<ChatResult | null> {
  try {
    const res = await fetch('/api/chat', {
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
