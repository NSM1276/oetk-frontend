"use client";
import { useState, useRef, useEffect } from "react";

const STREAM = "https://eu.asiaplusradio.tj:8443/ap";

export default function FloatingRadioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastScrollRef = useRef(0);

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setLoading(true);
    audio.src = STREAM + "?t=" + Date.now(); // cache buster
    audio.load();
    audio.play().catch(() => {
      setLoading(false);
      setPlaying(false);
    });
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.src = "";
    setPlaying(false);
    setLoading(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlaying = () => {
      setLoading(false);
      setPlaying(true);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handleError = () => {
      setLoading(false);
      setPlaying(false);
    };

    const handlePause = () => {
      setPlaying(false);
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("error", handleError);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Handle scroll collapse/expand
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const scrollDiff = currentScroll - lastScrollRef.current;

      // Scroll down = collapse, scroll up = expand
      if (scrollDiff > 30) {
        // Scrolling down
        setIsCollapsed(true);
        lastScrollRef.current = currentScroll;
      } else if (scrollDiff < -30) {
        // Scrolling up
        setIsCollapsed(false);
        lastScrollRef.current = currentScroll;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const PlayPauseButton = () => (
    <button
      onClick={playing ? pause : play}
      disabled={loading}
      aria-label={playing ? "Pause" : "Play"}
      className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-burgundy
                 flex items-center justify-center text-white shadow-lg
                 hover:shadow-xl transition-shadow disabled:opacity-50
                 active:scale-95 flex-shrink-0"
    >
      {loading ? (
        <svg
          className="w-5 h-5 animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : playing ? (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 ml-0.5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <polygon points="5,3 19,12 5,21" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="fixed bottom-5 right-5 z-45 w-[280px]">
      {/* Floating widget container with smooth transitions */}
      <div
        className={`transition-all duration-300 ease-in-out rounded-xl shadow-2xl bg-cream/95 backdrop-blur-md overflow-hidden border border-line/40 ${
          isCollapsed ? "h-[60px]" : "h-auto"
        }`}
      >
        {/* Header / Collapsed Bar */}
        <div className="px-4 py-3 flex items-center justify-between gap-2 border-b border-line/30">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-5 h-5 text-burgundy text-lg flex-shrink-0">🎙️</div>
            <span className="text-sm font-medium text-ink font-display tracking-tight truncate">
              OETK FM
            </span>
          </div>
          {isCollapsed && <PlayPauseButton />}
        </div>

        {/* Expanded Content (hidden when collapsed) */}
        {!isCollapsed && (
          <>
            {/* Artwork Disc */}
            <div className="flex justify-center py-6">
              <div
                className="w-32 h-32 rounded-full border-2 border-gold/30 flex items-center justify-center flex-shrink-0"
                style={{
                  animation: playing ? "spin 18s linear infinite" : "none",
                }}
              >
                {/* Gradient circle background */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold/20 to-burgundy/20" />
              </div>
            </div>

            {/* Track Info */}
            <div className="text-center px-4 pb-5">
              <div className="text-sm font-medium text-ink font-display">
                Asia Plus Radio
              </div>
              <div className="text-xs text-muted tracking-tight">
                Dushanbe, Tajikistan
              </div>
            </div>

            {/* Play/Pause Button */}
            <div className="flex justify-center pb-6">
              <button
                onClick={playing ? pause : play}
                disabled={loading}
                aria-label={playing ? "Pause" : "Play"}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-burgundy
                           flex items-center justify-center text-white shadow-lg
                           hover:shadow-xl transition-shadow disabled:opacity-50
                           active:scale-95 flex-shrink-0"
              >
                {loading ? (
                  <svg
                    className="w-6 h-6 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : playing ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        crossOrigin="anonymous"
        preload="none"
        playsInline
      />
    </div>
  );
}
