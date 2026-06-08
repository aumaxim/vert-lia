export type ChatRole = 'user' | 'assistant';
export type Msg = { role: ChatRole; content: string };

export async function sendMessage(_history: Msg[]): Promise<string | null> {
  await new Promise((r) => setTimeout(r, 600));
  return 'Démo en cours de branchement — la vraie IA arrive bientôt.';
}
