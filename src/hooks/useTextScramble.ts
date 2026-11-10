import { useRef, useEffect } from "react";

/**
 * Scramble/decode text animation — creates a cinematic "hacker terminal"
 * reveal effect where characters resolve one by one from random noise.
 */
export function useTextScramble(options: { delay?: number; speed?: number } = {}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finalText = el.textContent || "";
    const { delay = 600, speed = 30 } = options;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#▓▒░";
    const preserveChars = new Set([" ", "•", "&", "@", "—", "·"]);
    const length = finalText.length;
    let frame = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;

    // Start with scrambled state
    el.textContent = Array.from(finalText)
      .map((c: string) => (preserveChars.has(c) ? c : chars[Math.floor(Math.random() * chars.length)]))
      .join("");

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        const resolved = Math.floor(frame / 2.5);
        let output = "";

        for (let i = 0; i < length; i++) {
          if (i < resolved) {
            output += finalText[i];
          } else if (preserveChars.has(finalText[i])) {
            output += finalText[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        el.textContent = output;
        frame++;

        if (resolved >= length) {
          clearInterval(intervalId);
          el.textContent = finalText;
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [options.delay, options.speed]);

  return ref;
}
