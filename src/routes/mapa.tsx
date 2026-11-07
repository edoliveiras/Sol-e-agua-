import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, ExternalLink } from "lucide-react";
import { destinations } from "@/data/destinations";
import { searchUrl } from "@/services/maps";

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de destinos — SOL & ÁGUA" },
      { name: "description", content: "Visão geral dos destinos naturais do guia SOL & ÁGUA." },
      { property: "og:title", content: "Mapa de destinos — SOL & ÁGUA" },
      { property: "og:description", content: "Explore praias e cachoeiras pelo mapa." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-extrabold">Localização dos destinos</h1>
      <p className="mb-5 text-muted-foreground">Escolha um destino para abrir sua localização no Google Maps. Os pontos ainda sem coordenadas precisas abrem uma busca pelo nome e município.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {destinations.map((d) => (
          <li key={d.id}>
            <Link to="/destino/$id" params={{ id: d.id }} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
              <MapPin className={d.category === "praia" ? "h-5 w-5 text-turquoise" : "h-5 w-5 text-nature"} />
              <div className="min-w-0 flex-1"><div className="font-bold">{d.name}</div><div className="text-sm text-muted-foreground">{d.city} - {d.state}</div></div>
              <a href={searchUrl(d)} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-secondary px-3 py-2 text-xs font-bold text-primary"><ExternalLink className="h-4 w-4" /> Mapa</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ),
});