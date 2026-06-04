const ROW_ONE_ITEM = "ÖSTERREICHISCH-TADSCHIKISCHE KULTURGEMEINDE";
const ROW_TWO_ITEM = "AUSTRIA · TAJIKISTAN · КУЛЬТУРА · ФАРҲАНГ · KULTUR";

const SEPARATOR = " · ";

function buildRow(text: string, count: number = 4): string {
  return Array(count).fill(text).join(SEPARATOR) + SEPARATOR;
}

const rowOneText = buildRow(ROW_ONE_ITEM, 4);
const rowTwoText = buildRow(ROW_TWO_ITEM, 4);

export default function MarqueeDivider() {
  return (
    <>
      <style>{`
        @keyframes marquee-ltr {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        @keyframes marquee-rtl {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          cursor: default;
        }

        .marquee-track:hover {
          animation-play-state: paused !important;
        }

        .marquee-track--rtl {
          animation: marquee-rtl 32s linear infinite;
        }

        .marquee-track--ltr {
          animation: marquee-ltr 38s linear infinite;
        }

        .marquee-word {
          white-space: nowrap;
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(3rem, 7vw, 6rem);
          font-weight: 900;
          letter-spacing: 0.04em;
          line-height: 1;
          background: transparent;
          color: transparent;
          -webkit-text-stroke: 1.5px;
          user-select: none;
        }

        .marquee-word--burgundy {
          -webkit-text-stroke-color: #8b2635;
        }

        .marquee-word--gold {
          -webkit-text-stroke-color: #b8924a;
        }
      `}</style>

      <div
        className="py-8 overflow-hidden"
        aria-hidden="true"
        role="presentation"
      >
        {/* Row 1 — scrolls right to left */}
        <div className="marquee-track marquee-track--rtl">
          {[rowOneText, rowOneText].map((chunk, chunkIdx) =>
            chunk.split(SEPARATOR).map((segment, i) => {
              if (!segment.trim()) return null;
              const isGold = (chunkIdx * 10 + i) % 2 === 0;
              return (
                <span
                  key={`r1-${chunkIdx}-${i}`}
                  className={`marquee-word ${isGold ? "marquee-word--gold" : "marquee-word--burgundy"}`}
                >
                  {segment}&nbsp;{SEPARATOR.trim()}&nbsp;
                </span>
              );
            })
          )}
        </div>

        {/* Row 2 — scrolls left to right (opposite direction) */}
        <div className="marquee-track marquee-track--ltr" style={{ marginTop: "0.5rem" }}>
          {[rowTwoText, rowTwoText].map((chunk, chunkIdx) =>
            chunk.split(SEPARATOR).map((segment, i) => {
              if (!segment.trim()) return null;
              const isGold = (chunkIdx * 10 + i) % 2 !== 0;
              return (
                <span
                  key={`r2-${chunkIdx}-${i}`}
                  className={`marquee-word ${isGold ? "marquee-word--gold" : "marquee-word--burgundy"}`}
                >
                  {segment}&nbsp;{SEPARATOR.trim()}&nbsp;
                </span>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
