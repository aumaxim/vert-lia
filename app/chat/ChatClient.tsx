'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Zap, RotateCcw } from 'lucide-react';
import {
  BASE_TOKENS,
  BASE_WH,
  BASE_CO2,
  BASE_WATER,
  PHONE_WH,
  SESSION_FULL_WH,
  estTokens,
  fmtFR,
  fmtWh,
} from '@/lib/estimates';
import { sendMessage, type Msg } from '@/lib/chat';

type DisplayMsg = {
  role: 'user' | 'ai';
  text: string;
  cost?: { wh: number; co2: number; tokens: number };
};

const INITIAL: DisplayMsg = {
  role: 'ai',
  text: 'Salut ! Pose-moi une question. Tu verras à droite l’estimation de ce que chaque réponse consomme.',
};

const RESET: DisplayMsg = {
  role: 'ai',
  text: 'Session réinitialisée. Repars de zéro !',
};

const SUGGESTIONS = [
  'Explique la photosynthèse simplement',
  'Donne-moi 3 idées de repas véggie',
  'C’est quoi un data center ?',
];

export default function ChatClient() {
  const [messages, setMessages] = useState<DisplayMsg[]>([INITIAL]);
  const [history, setHistory] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [showSuggest, setShowSuggest] = useState(true);
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const [totals, setTotals] = useState({ wh: 0, co2: 0, water: 0, count: 0 });
  const [last, setLast] = useState<
    { tokens: number; wh: number; co2: number; water: number } | null
  >(null);

  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  async function send(text: string) {
    if (!text.trim() || sending) return;
    setShowSuggest(false);
    setSending(true);

    setMessages((m) => [...m, { role: 'user', text }]);
    const nextHistory: Msg[] = [...history, { role: 'user', content: text }];
    setHistory(nextHistory);
    setInput('');
    setIsTyping(true);

    const result = await sendMessage(nextHistory);
    setIsTyping(false);

    if (!result) {
      setMessages((m) => [
        ...m,
        {
          role: 'ai',
          text:
            "Désolé, je n'ai pas pu répondre (limite de requêtes ou réseau). Réessaie dans un instant — le compteur, lui, ne bouge que pour les vraies réponses.",
        },
      ]);
      setSending(false);
      return;
    }

    const { reply, usage } = result;
    setHistory((h) => [...h, { role: 'assistant', content: reply }]);

    const inTok = usage?.input_tokens ?? estTokens(text);
    const outTok = usage?.output_tokens ?? estTokens(reply);
    const totTok = inTok + outTok;
    const ratio = totTok / BASE_TOKENS;
    const wh = BASE_WH * ratio;
    const co2 = BASE_CO2 * ratio;
    const water = BASE_WATER * ratio;

    setTotals((t) => ({
      wh: t.wh + wh,
      co2: t.co2 + co2,
      water: t.water + water,
      count: t.count + 1,
    }));
    setLast({ tokens: totTok, wh, co2, water });
    setMessages((m) => [
      ...m,
      { role: 'ai', text: reply, cost: { wh, co2, tokens: totTok } },
    ]);
    setSending(false);
  }

  function reset() {
    setMessages([RESET]);
    setHistory([]);
    setShowSuggest(true);
    setTotals({ wh: 0, co2: 0, water: 0, count: 0 });
    setLast(null);
  }

  const fillPct = Math.max(0, Math.min(100, (totals.wh / SESSION_FULL_WH) * 100));
  const phonePct = (totals.wh / PHONE_WH) * 100;

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', padding: '48px 0 8px' }}>
        <div className="blobs">
          <div
            className="blob g"
            style={{ width: 300, height: 300, top: -50, left: '-3%' }}
          ></div>
          <div
            className="blob a"
            style={{ width: 240, height: 240, top: 0, right: '2%' }}
          ></div>
        </div>
        <div
          className="wrap"
          style={{ position: 'relative', zIndex: 1, maxWidth: 880 }}
        >
          <div className="eyebrow reveal">Démo live</div>
          <h1
            className="h1 reveal"
            data-delay="60"
            style={{ fontSize: 'clamp(32px,4.6vw,52px)', margin: '14px 0 14px' }}
          >
            Discute avec une IA, vois la facture en direct
          </h1>
          <p className="lead reveal" data-delay="120">
            Pose tes questions à un vrai modèle. À chaque réponse, on estime l&apos;énergie, le CO₂
            et l&apos;eau mobilisés — et on additionne le tout sur ta session.
          </p>
        </div>
      </section>

      {/* CHAT + METER */}
      <section className="section-sm" style={{ paddingTop: 22 }}>
        <div className="wrap chat-grid">
          {/* Chat panel */}
          <div className="card chat-panel reveal">
            <div className="chat-head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="dot-live"></span>
                <strong>Assistant IA</strong>
                <span className="model-tag mono">modèle efficace · type Haiku</span>
              </div>
              <button className="reset-btn" onClick={reset} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <RotateCcw size={13} strokeWidth={2.4} /> Réinitialiser
              </button>
            </div>

            <div className="messages" ref={messagesRef}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`msg ${m.role === 'user' ? 'user' : 'ai'}${
                    m.cost ? ' cost' : ''
                  }`}
                >
                  <div className="bubble">
                    {m.text}
                    {m.cost && (
                      <>
                        <br />
                        <span className="cost-tag">
                          <Zap size={11} strokeWidth={2.6} style={{ verticalAlign: '-1px' }} /> {fmtWh(m.cost.wh)} · {fmtFR(m.cost.co2, 1)} g CO₂ · ~
                          {m.cost.tokens} tokens
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="msg ai typing">
                  <div className="bubble">l&rsquo;IA réfléchit</div>
                </div>
              )}
            </div>

            {showSuggest && (
              <div className="suggest">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="chip" onClick={() => send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                type="text"
                placeholder="Écris ton message…"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="send" disabled={sending}>
                Envoyer
              </button>
            </form>
          </div>

          {/* Meter */}
          <aside className="meter reveal" data-delay="80">
            <div className="meter-card big">
              <div className="rc-label">Cette session · énergie</div>
              <div className="meter-num">{fmtWh(totals.wh)}</div>
              <div className="meter-bar">
                <div className="meter-fill" style={{ width: fillPct + '%' }}></div>
              </div>
              <div className="meter-equiv">
                ≈ {fmtFR(phonePct, phonePct < 10 ? 1 : 0)}
                &nbsp;% d&rsquo;une charge de smartphone
              </div>
            </div>

            <div className="meter-row">
              <div className="meter-card">
                <div className="rc-label">CO₂</div>
                <div className="meter-sub">
                  {fmtFR(totals.co2, totals.co2 < 10 ? 1 : 0)} g
                </div>
              </div>
              <div className="meter-card">
                <div className="rc-label">Eau</div>
                <div className="meter-sub">
                  {fmtFR(totals.water, totals.water < 10 ? 1 : 0)} cL
                </div>
              </div>
              <div className="meter-card">
                <div className="rc-label">Échanges</div>
                <div className="meter-sub">{totals.count}</div>
              </div>
            </div>

            {last && (
              <div className="last-card">
                <div className="rc-label">Dernière réponse</div>
                <div className="last-grid">
                  <div>
                    <span className="lk">Tokens</span>
                    <span className="lv mono">{last.tokens}</span>
                  </div>
                  <div>
                    <span className="lk">Énergie</span>
                    <span className="lv mono t-green">{fmtWh(last.wh)}</span>
                  </div>
                  <div>
                    <span className="lk">CO₂</span>
                    <span className="lv mono t-amber">{fmtFR(last.co2, 1)} g</span>
                  </div>
                  <div>
                    <span className="lk">Eau</span>
                    <span className="lv mono t-cyan">{fmtFR(last.water, 1)} cL</span>
                  </div>
                </div>
              </div>
            )}

            <p className="meter-note">
              Estimation pédagogique : ~0,3 Wh / ~2 g CO₂ pour une réponse type (~300 tokens), mise
              à l&rsquo;échelle selon la longueur réelle. Voir{' '}
              <Link href="/sources">Sources</Link>.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
