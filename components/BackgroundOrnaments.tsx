// Фоновый слой с персидско-таджикскими орнаментами.
// Микс трёх типов мотивов:
//   • Геометрия (хатам, концентрические восьмиугольники, гексаграмма) — каркас
//   • Шамса (شمسه) — медальон-солнце с лучами, классика персидских ковров и куполов
//   • Бута (پته) — каплевидный «огурец», иконический персидский мотив (пейсли)
//   • Сюзане-розетка — 8-лепестковый цветок из бухарской вышивки
//
// Технически: position:fixed + pointer-events:none + aria-hidden — не блокирует
// клики, не мешает скрин-ридерам. Анимации чисто CSS (GPU-ускорено), уважают
// prefers-reduced-motion (см. globals.css).

export default function BackgroundOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* 1. Большая 8-конечная звезда (хатам) — верх-право.
          Два наложенных квадрата под 45° — классический исламский мотив. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute -right-24 top-16 h-[480px] w-[480px] text-gold animate-spin-very-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        style={{ opacity: 0.18 }}
      >
        <rect x="20" y="20" width="60" height="60" />
        <rect
          x="20"
          y="20"
          width="60"
          height="60"
          transform="rotate(45 50 50)"
        />
      </svg>

      {/* 2. ШАМСА — медальон-солнце с 16 лучами и тремя концентрическими
          окружностями. Средне-лево. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute -left-12 top-[38%] h-[400px] w-[400px] text-gold-soft animate-spin-reverse-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        style={{ opacity: 0.18 }}
      >
        {/* Концентрические окружности */}
        <circle cx="50" cy="50" r="46" />
        <circle cx="50" cy="50" r="34" />
        <circle cx="50" cy="50" r="14" />
        {/* 16-лучевой звёздный полигон между r=22 и r=44 */}
        <polygon points="50,6 55.5,22.5 66.1,11.2 65.6,26.7 79.7,20.3 73.3,34.4 88.8,33.9 77.5,44.5 94,50 77.5,55.5 88.8,66.1 73.3,65.6 79.7,79.7 65.6,73.3 66.1,88.8 55.5,77.5 50,94 44.5,77.5 33.9,88.8 34.4,73.3 20.3,79.7 26.7,65.6 11.2,66.1 22.5,55.5 6,50 22.5,44.5 11.2,33.9 26.7,34.4 20.3,20.3 34.4,26.7 33.9,11.2 44.5,22.5" />
        {/* Маленькая центральная розетка */}
        <circle cx="50" cy="50" r="6" />
      </svg>

      {/* 3. Концентрические восьмиугольники — низ-право. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute right-[8%] bottom-[10%] h-[340px] w-[340px] text-gold animate-spin-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        style={{ opacity: 0.14 }}
      >
        <polygon points="29.3,5 70.7,5 95,29.3 95,70.7 70.7,95 29.3,95 5,70.7 5,29.3" />
        <polygon points="35,18 65,18 82,35 82,65 65,82 35,82 18,65 18,35" />
        <polygon points="40,30 60,30 70,40 70,60 60,70 40,70 30,60 30,40" />
      </svg>

      {/* 4. БУТА (paisley) — каплевидный «персидский огурец», иконический мотив.
          Большая, центр-низ, плавный дрейф. Внутри — меньшая бута для глубины. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute left-[40%] top-[50%] h-[520px] w-[520px] text-gold-soft animate-drift"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        style={{ opacity: 0.16 }}
      >
        {/* Внешний контур буты */}
        <path d="M 50 95 C 22 95, 8 72, 10 48 C 12 22, 32 6, 56 6 C 78 6, 92 22, 88 42 C 85 58, 68 62, 54 60 C 44 58, 38 66, 44 80 C 47 88, 49 92, 50 95 Z" />
        {/* Внутренняя бута поменьше — даёт «вложенность» */}
        <path d="M 52 75 C 38 75, 28 62, 30 48 C 32 32, 44 22, 58 22 C 70 22, 78 32, 76 44 C 74 53, 65 56, 58 55 C 53 54, 50 58, 52 65 Z" />
        {/* Маленькая капля-сердцевина */}
        <path d="M 56 50 C 50 50, 46 44, 48 38 C 50 32, 56 28, 62 30 C 67 32, 68 38, 64 42 C 61 45, 58 46, 56 50 Z" />
      </svg>

      {/* 5. СЮЗАНЕ-РОЗЕТКА — 8-лепестковый цветок из бухарской вышивки. Низ-лево. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute left-[10%] bottom-[14%] h-[280px] w-[280px] text-gold animate-spin-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        style={{ opacity: 0.18 }}
      >
        {/* Внешняя обводка */}
        <circle cx="50" cy="50" r="46" />
        {/* 8 лепестков (эллипсы) — каждый повёрнут на 45° */}
        <g>
          <ellipse cx="50" cy="22" rx="7" ry="16" />
          <ellipse
            cx="50"
            cy="22"
            rx="7"
            ry="16"
            transform="rotate(45 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="7"
            ry="16"
            transform="rotate(90 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="7"
            ry="16"
            transform="rotate(135 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="7"
            ry="16"
            transform="rotate(180 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="7"
            ry="16"
            transform="rotate(225 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="7"
            ry="16"
            transform="rotate(270 50 50)"
          />
          <ellipse
            cx="50"
            cy="22"
            rx="7"
            ry="16"
            transform="rotate(315 50 50)"
          />
        </g>
        {/* Центральный круг */}
        <circle cx="50" cy="50" r="10" />
        <circle cx="50" cy="50" r="4" />
      </svg>

      {/* 6. Шестилучевая звезда (две треугольника) — верх-лево. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute left-[8%] top-[15%] h-[260px] w-[260px] text-gold-soft animate-spin-reverse-slow"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.7"
        style={{ opacity: 0.14 }}
      >
        <polygon points="50,8 91,79 9,79" />
        <polygon points="50,92 9,21 91,21" />
      </svg>
    </div>
  );
}
