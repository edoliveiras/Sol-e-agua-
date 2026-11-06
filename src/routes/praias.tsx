import { createFileRoute } from "@tanstack/react-router";
import { DestinationExplorer } from "@/components/DestinationExplorer";

export const Route = createFileRoute("/praias")({
  head: () => ({
    meta: [
      { title: "Praias do Brasil — SOL & ÁGUA" },
      { name: "description", content: "Descubra praias brasileiras, filtre por estado e região e trace sua rota." },
      { property: "og:title", content: "Praias do Brasil — SOL & ÁGUA" },
      { property: "og:description", content: "Praias brasileiras para sua próxima viagem." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-ocean">Praias do Brasil</h1>
      <p className="mb-5 text-muted-foreground">Litoral de norte a sul · dados demonstrativos</p>
      <DestinationExplorer fixedCategory="praia" />
    </div>
  ),
});