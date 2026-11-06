export function BrandMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="15" r="7" className="fill-sun" />
      <path d="M4 26c4-3 8-3 12 0s8 3 12 0 6-3 8-1.5" className="stroke-turquoise" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M4 33c4-3 8-3 12 0s8 3 12 0 6-3 8-1.5" className="stroke-ocean" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <BrandMark />
      <div className="leading-none">
        <div className="font-display text-lg font-extrabold tracking-wide text-ocean">SOL &amp; ÁGUA</div>
        <div className="text-[11px] text-muted-foreground">Praias e Cachoeiras do Brasil</div>
      </div>
    </div>
  );
}