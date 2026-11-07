import { useMemo, useState } from "react";
import { ExternalLink, Hotel, MapPinned, PartyPopper, Utensils } from "lucide-react";
import { destinations } from "@/data/destinations";
import { searchUrl } from "@/services/maps";
import type { Destination } from "@/types/destination";

export type NearbyCategory = "hospedagem" | "gastronomia" | "lazer";

const categoryByGroup: Record<NearbyCategory, Destination["category"][]> = {
  hospedagem: ["hotel", "pousada", "day-use"],
  gastronomia: ["gastronomia"],
  lazer: ["evento", "passeio", "cultural"],
};

const normalize = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();

export function supportsNearbyDirectory(destination: Destination): boolean {
  return destination.category === "praia" || destination.category === "cachoeira";
}

function distanceInKm(value?: string): number | null {
  if (!value) return null;
  const normalized = value.toLocaleLowerCase("pt-BR").replace(",", ".");
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const amount = Number(match[1]);
  if (/\bm\b|metro/.test(normalized) && !/km/.test(normalized)) return amount / 1000;
  if (/min|hora|trilha/.test(normalized) && !/km/.test(normalized)) return null;
  return /km/.test(normalized) ? amount : null;
}

function coordinatesDistanceKm(from: Destination, to: Destination): number | null {
  if (!from.coordinates?.verified || !to.coordinates?.verified) return null;
  const rad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = rad(to.coordinates.lat - from.coordinates.lat);
  const dLng = rad(to.coordinates.lng - from.coordinates.lng);
  const lat1 = rad(from.coordinates.lat);
  const lat2 = rad(to.coordinates.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDistanceKm(destination: Destination, item: Destination): number | null {
  return distanceInKm(item.distanceToDestination) ?? coordinatesDistanceKm(destination, item);
}

export function getNearbyPlaces(destination: Destination, group: NearbyCategory): Destination[] {
  return destinations
    .filter((item) =>
      categoryByGroup[group].includes(item.category) &&
      item.state === destination.state &&
      normalize(item.city) === normalize(destination.city),
    )
    .sort((a, b) => {
      const distanceA = getDistanceKm(destination, a);
      const distanceB = getDistanceKm(destination, b);
      if (distanceA === null && distanceB === null) return a.name.localeCompare(b.name, "pt-BR");
      if (distanceA === null) return 1;
      if (distanceB === null) return -1;
      return distanceA - distanceB;
    });
}

const buttons: { id: NearbyCategory; label: string; Icon: typeof Hotel }[] = [
  { id: "hospedagem", label: "Hospedagens", Icon: Hotel },
  { id: "gastronomia", label: "Bares e restaurantes", Icon: Utensils },
  { id: "lazer", label: "Lugares para sair", Icon: PartyPopper },
];

function distanceLabel(destination: Destination, item: Destination): string {
  const known = getDistanceKm(destination, item);
  if (known !== null) return known < 1 ? `${Math.round(known * 1000)} m` : `${known.toFixed(1).replace(".", ",")} km`;
  return "Distância não informada";
}

export function NearbyPlaces({ destination }: { destination: Destination }) {
  const [active, setActive] = useState<NearbyCategory | null>(null);
  const places = useMemo(
    () => active ? getNearbyPlaces(destination, active) : [],
    [active, destination],
  );

  if (!supportsNearbyDirectory(destination)) return null;

  return (
    <section className="mb-5 rounded-3xl border border-border bg-card p-3 shadow-soft sm:p-4" aria-label="Serviços próximos ao destino">
      <h2 className="mb-3 text-lg font-extrabold">Explore o que tem por perto</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {buttons.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={active === id}
            onClick={() => setActive(active === id ? null : id)}
            className={`flex min-h-14 items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm font-extrabold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active === id ? "bg-gradient-ocean text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-4" aria-live="polite">
          <h3 className="mb-3 text-base font-bold">{buttons.find((button) => button.id === active)?.label} perto de {destination.name}</h3>
          {places.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-background px-4 py-6 text-center">
              <p className="font-bold">Em breve</p>
              <p className="mt-1 text-sm text-muted-foreground">Ainda não há itens desta categoria cadastrados para este município.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {places.map((item) => (
                <article key={item.id} className="rounded-2xl border border-border bg-background p-3">
                  <h4 className="font-bold leading-snug">{item.name}</h4>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPinned className="h-4 w-4 shrink-0" /> {distanceLabel(destination, item)} · {item.city} - {item.state}
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Nota:</strong>{" "}
                    {item.ratings?.length
                      ? item.ratings.map((rating) => `${rating.platform}: ${rating.score.toFixed(1)}/${rating.scale ?? 5}${rating.reviewCount ? ` (${rating.reviewCount} avaliações)` : ""}`).join(" · ")
                      : "Sem avaliação cadastrada"}
                  </p>
                  <p className="mt-1 text-sm"><strong>Preço:</strong> {item.priceRange ?? "Não informado"}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={searchUrl(item)} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-gradient-ocean px-3 py-2 text-sm font-bold text-primary-foreground">
                      <MapPinned className="h-4 w-4" /> Abrir no mapa
                    </a>
                    {item.website && <a href={item.website} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground">
                      <ExternalLink className="h-4 w-4" /> Site
                    </a>}
                    {item.instagram && <a href={item.instagram} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground">
                      <ExternalLink className="h-4 w-4" /> Instagram
                    </a>}
                    {item.facebook && <a href={item.facebook} target="_blank" rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm font-bold text-secondary-foreground">
                      <ExternalLink className="h-4 w-4" /> Facebook
                    </a>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
