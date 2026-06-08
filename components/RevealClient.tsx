'use client';

import { useEffect } from 'react';
import { fmtFR } from '@/lib/estimates';

declare global {
  interface Window {
    fmtFR?: typeof fmtFR;
  }
}

export default function RevealClient() {
  useEffect(() => {
    window.fmtFR = fmtFR;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    const bars = Array.from(document.querySelectorAll<HTMLElement>('.bf[data-w]'));

    counters.forEach((el) => {
      const t = parseFloat(el.getAttribute('data-count') || '0');
      const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = prefix + fmtFR(t, dec) + suffix;
    });

    function inView(el: HTMLElement, margin = 0.06) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * (1 - margin) && r.bottom > 0;
    }

    function countUp(el: HTMLElement) {
      const anyEl = el as HTMLElement & { __counted?: boolean };
      if (anyEl.__counted) return;
      anyEl.__counted = true;
      const target = parseFloat(el.getAttribute('data-count') || '0');
      const dec = parseInt(el.getAttribute('data-dec') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const dur = parseInt(el.getAttribute('data-dur') || '1400', 10);
      let start: number | null = null;
      function step(ts: number) {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + fmtFR(target * eased, dec) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = prefix + fmtFR(target, dec) + suffix;
      }
      requestAnimationFrame(step);
    }

    function pass() {
      reveals.forEach((e) => {
        if (!e.classList.contains('in') && inView(e, 0.04)) {
          const d = e.getAttribute('data-delay');
          if (d) e.style.animationDelay = d + 'ms';
          e.classList.add('in');
        }
      });
      counters.forEach((e) => {
        if (!(e as HTMLElement & { __counted?: boolean }).__counted && inView(e, 0.1)) {
          countUp(e);
        }
      });
      bars.forEach((b) => {
        const ab = b as HTMLElement & { __filled?: boolean };
        if (!ab.__filled && inView(b, 0.06)) {
          ab.__filled = true;
          setTimeout(() => {
            const w = b.getAttribute('data-w');
            if (w) b.style.width = w;
          }, 100);
        }
      });
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        pass();
        ticking = false;
      });
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pass();
        setTimeout(pass, 200);
        setTimeout(pass, 500);
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return null;
}
