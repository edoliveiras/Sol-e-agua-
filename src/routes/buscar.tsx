import { createFileRoute } from "@tanstack/react-router";
import { DestinationExplorer } from "@/components/DestinationExplorer";

export const Route = createFileRoute("/buscar")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s["q"] === "string" ? (s["q"] as string) : "" }),
  head: () => ({
    meta: [
      { title: "Buscar destinos — SOL & ÁGUA" },
      { name: "description", content: "Pesquise praias e cachoeiras por nome, cidade, estado ou região." },
      { property: "og:title", content: "Buscar destinos — SOL & ÁGUA" },
      { property: "og:description", content: "Pesquise praias e cachoeiras do Brasil." },
    ],
  }),
  component: BuscarPage,
});

function BuscarPage() {
  const { q } = Route.useSearch();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-5 text-3xl font-extrabold">Buscar destinos</h1>
      <DestinationExplorer key={q} initialQuery={q} />
    </div>
  );
}