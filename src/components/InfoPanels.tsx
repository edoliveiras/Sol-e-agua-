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
      {w?.status === "connected" && w.current ? (
        <>
          <div className="rounded-xl bg-secondary p-4">
            <div className="text-sm font-semibold text-muted-foreground">Condições atuais estimadas</div>
            <div className="mt-1 flex items-center gap-3">
              <CloudSun className="h-10 w-10 text-sun" />
              <div><div className="font-display text-3xl font-extrabold">{Math.round(w.current.tempC)} °C</div><div className="text-sm">{w.current.condition}</div></div>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span>Umidade: {w.current.humidity}%</span><span>Vento: {Math.round(w.current.windKmh)} km/h</span><span>Chance de chuva: {w.current.rainProbability === null ? "—" : `${w.current.rainProbability}%`}</span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {w.forecast?.map((day) => (
              <div key={day.date} className="rounded-xl bg-secondary p-3 text-center">
                <div className="text-xs font-semibold capitalize text-muted-foreground">{new Date(day.date + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "short" })}</div>
                <CloudSun className="mx-auto my-2 h-6 w-6 text-sun" />
                <div className="font-display text-sm font-bold">{Math.round(day.tempMaxC)}° / {Math.round(day.tempMinC)}°</div>
                <div className="mt-1 text-[10px] text-muted-foreground">{day.condition}</div>
                <div className="text-[10px] text-muted-foreground">Chuva: {day.rainProbability === null ? "—" : `${day.rainProbability}%`} · {day.precipitationMm} mm</div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-right text-[10px] text-muted-foreground">Fonte: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="underline">Open-Meteo</a> · modelo meteorológico do município; não substitui alertas oficiais</p>
        </>
      ) : w?.status === "error" || w?.status === "not_connected" ? (
        <NotConnected text="Previsão indisponível para este município no momento. Consulte também os avisos meteorológicos oficiais." />
      ) : (
        <NotConnected text="Carregando previsão do tempo para o município. Se não houver conexão, tente novamente mais tarde." />
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
