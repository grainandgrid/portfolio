import { useMemo, useRef, useState } from 'react';

type ProfileCardProps = {
  name: string;
  title: string;
  handle: string;
  status: string;
  contactText: string;
  avatarUrl: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
  behindGlowColor?: string;
  iconUrl?: string;
  behindGlowEnabled?: boolean;
  innerGradient?: string;
};

function isTouchDevice() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(pointer: coarse)').matches;
}

export default function ProfileCard({
  name,
  title,
  handle,
  status,
  contactText,
  avatarUrl,
  showUserInfo = true,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  behindGlowColor = 'hsla(20, 95%, 62%, 0.35)',
  iconUrl,
  behindGlowEnabled = true,
  innerGradient = 'linear-gradient(145deg, hsla(0, 0%, 12%, 0.65) 0%, hsla(0, 0%, 4%, 0.35) 100%)',
}: ProfileCardProps) {
  const [tiltStyle, setTiltStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [shineStyle, setShineStyle] = useState('none');
  const cardRef = useRef<HTMLDivElement>(null);

  const iconBackground = useMemo(() => {
    if (iconUrl) {
      return {
        backgroundImage: `url(${iconUrl})`,
      };
    }

    return {
      backgroundImage:
        'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.14) 1px, transparent 0)',
      backgroundSize: '12px 12px',
    };
  }, [iconUrl]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt) {
      return;
    }

    if (isTouchDevice() && !enableMobileTilt) {
      return;
    }

    const card = cardRef.current;
    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -12;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    setTiltStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
    );
    setShineStyle(`radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.30), rgba(255,255,255,0) 45%)`);
  };

  const resetTilt = () => {
    setTiltStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShineStyle('none');
  };

  return (
    <div className="relative group" onMouseMove={handleMouseMove} onMouseLeave={resetTilt}>
      {behindGlowEnabled ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: behindGlowColor }}
        />
      ) : null}

      <article
        ref={cardRef}
        className="relative h-[29rem] overflow-hidden rounded-3xl border border-fg/20 bg-black/35 transition-transform duration-300"
        style={{ transform: tiltStyle }}
      >
        <img
          src={avatarUrl}
          alt={`${name} - ${title}`}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0" style={{ background: innerGradient }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
        <div className="absolute inset-0" style={{ background: shineStyle }} />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 mix-blend-screen"
          style={iconBackground}
        />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <p className="mb-2 text-[11px] uppercase tracking-[0.38em] text-fg/75">{title}</p>
          <h3 className="mb-3 text-3xl font-serif italic md:text-4xl">{name}</h3>

          {showUserInfo ? (
            <div className="mb-5 flex items-center justify-between text-sm text-fg/80">
              <span>@{handle}</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {status}
              </span>
            </div>
          ) : null}

          <button
            type="button"
            onClick={onContactClick}
            className="rounded-full border border-fg/35 bg-black/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-fg transition-colors duration-300 hover:bg-fg hover:text-bg"
          >
            {contactText}
          </button>
        </div>
      </article>
    </div>
  );
}
