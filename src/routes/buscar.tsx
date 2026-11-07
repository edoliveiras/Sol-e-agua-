import { createFileRoute } from "@tanstack/react-router";
import { DestinationExplorer } from "@/components/DestinationExplorer";

export const Route = createFileRoute("/buscar")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? (s["q"] as string) : "" }),
  head: () => ({
    meta: [
      { title: "Buscar destinos — SOL & ÁGUA" },
      { name: "description", content: "Pesquise praias, cachoeiras, hotéis, pousadas e day use por nome, cidade, estado ou região." },
      { property: "og:title", content: "Buscar destinos — SOL & ÁGUA" },
      { property: "og:description", content: "Explore praias, cachoeiras e hospedagens no Brasil." },
    ],
  }),
  component: BuscarPage,
});

function BuscarPage() {
  const { q } = Route.useSearch();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-extrabold">Explorar destinos e hospedagens</h1>
      <p className="mb-5 text-muted-foreground">Use os filtros para encontrar praias, cachoeiras, hotéis, pousadas e opções de day use.</p>
      <DestinationExplorer key={q} initialQuery={q} />
    </div>
  );
}