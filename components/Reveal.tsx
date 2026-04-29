"use client";

// Scroll-triggered reveal обёртка.
// Когда ребёнок попадает в viewport — плавно проявляется через fade + сдвиг снизу.
// Уважает prefers-reduced-motion: при включённой настройке анимация мгновенная.

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Задержка в мс — для stagger-эффектов (например, карточек в гриде). */
  delay?: number;
  className?: string;
  /** HTML-тег обёртки. По умолчанию div; для строк цитаты используем span. */
  as?: "div" | "li" | "p" | "span";
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Если IO недоступен (старые браузеры/SSR) — сразу показываем.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
