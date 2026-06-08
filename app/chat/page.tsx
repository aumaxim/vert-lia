import ChatClient from './ChatClient';
import './chat.css';

export const metadata = {
  title: "Démo live — Watt l'IA ?",
};

export default function ChatPage() {
  return (
    <main>
      <ChatClient />
    </main>
  );
}
