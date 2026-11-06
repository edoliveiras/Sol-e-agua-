import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { destinations } from "@/data/destinations";
import { MapPlaceholder } from "@/components/InfoPanels";

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
      <h1 className="mb-5 text-3xl font-extrabold">Explore pelo mapa</h1>
      <MapPlaceholder />
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {destinations.map((d) => (
          <li key={d.id}>
            <Link to="/destino/$id" params={{ id: d.id }} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
              <MapPin className={d.category === "praia" ? "h-5 w-5 text-turquoise" : "h-5 w-5 text-nature"} />
              <div><div className="font-bold">{d.name}</div><div className="text-sm text-muted-foreground">{d.city} - {d.state}</div></div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ),
});