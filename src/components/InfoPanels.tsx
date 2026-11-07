import { useEffect, useState } from "react";
import { AlertTriangle, CloudSun, MapPinned, Waves } from "lucide-react";
import type { Destination, MarineResult, WeatherResult } from "@/types/destination";
import { getMarineConditions, getWeather } from "@/services/weather";

function NotConnected({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed bg-muted p-4 text-sm text-muted-foreground">{text}</div>
  );
}

export function WeatherPanel({ d }: { d: Destination }) {
  const [w, setW] = useState<WeatherResult | null>(null);
  useEffect(() => { getWeather(d).then(setW); }, [d]);
  return (
    <section className="rounded-2xl bg-card p-5 shadow-soft">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><CloudSun className="h-5 w-5 text-sun" /> Previsão do tempo</h2>
      {w?.status === "connected" ? null : (
        <>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {["Hoje", "Amanhã", "Depois"].map((day) => (
              <div key={day} className="rounded-xl bg-secondary p-3 text-center">
                <div className="text-xs font-semibold text-muted-foreground">{day}</div>
                <CloudSun className="mx-auto my-2 h-7 w-7 text-muted-foreground/50" />
                <div className="font-display text-lg font-bold text-muted-foreground">— °C</div>
              </div>
            ))}
          </div>
          <NotConnected text="Dados demonstrativos — conecte uma fonte meteorológica para consultar condições em tempo real." />
        </>
      )}
    </section>
  );
}

export function MarinePanel({ d }: { d: Destination }) {
  const [m, setM] = useState<MarineResult | null>(null);
  useEffect(() => { getMarineConditions(d).then(setM); }, [d]);
  return (
    <section className="rounded-2xl bg-card p-5 shadow-soft">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold"><Waves className="h-5 w-5 text-turquoise" /> Condições do mar</h2>
      {m?.status === "connected" ? null : (
        <NotConnected text="Ondas, marés e balneabilidade não estão conectadas. Consulte a Marinha do Brasil e o órgão ambiental estadual para informações oficiais." />
      )}
    </section>
  );
}

export function SafetyAlert({ d }: { d: Destination }) {
  const items =
    d.category === "cachoeira"
      ? ["Verifique se houve chuva recente na região — risco de cabeça d'água.", "Confira as condições da trilha e do acesso.", "Consulte avisos oficiais da unidade de conservação e da Defesa Civil.", "Nunca entre na água se notar mudança de cor, volume ou galhos descendo."]
      : ["Respeite as bandeiras e orientações dos guarda-vidas.", "Consulte avisos oficiais antes de entrar no mar."];
  return (
    <section className="rounded-2xl bg-warning p-5 text-warning-foreground">
      <h2 className="mb-2 flex items-center gap-2 text-lg font-bold"><AlertTriangle className="h-5 w-5" /> Antes da visita</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul>
      <p className="mt-3 text-xs font-semibold">Este guia não garante a segurança do local.</p>
    </section>
  );
}

export function MapPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-ocean p-6 text-primary-foreground shadow-soft">
      <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none" aria-hidden>
        <path d="M0 80 Q50 60 100 80 T200 70" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M0 100 Q50 80 100 100 T200 90" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M120 10 C150 20 160 50 140 70 C120 90 90 60 100 40 C105 25 110 12 120 10Z" fill="currentColor" />
      </svg>
      <div className="relative flex min-h-40 flex-col items-center justify-center text-center">
        <MapPinned className="mb-2 h-10 w-10 text-sun" />
        <div className="font-display text-xl font-bold">Encontre seu próximo destino</div>
        <p className="mt-1 max-w-sm text-sm opacity-90">Abra a lista de localizações e escolha um destino para ver o mapa e traçar sua rota no Google Maps.</p>
      </div>
    </div>
  );
}