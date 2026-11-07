import { createFileRoute } from "@tanstack/react-router";
import { DestinationExplorer } from "@/components/DestinationExplorer";

export const Route = createFileRoute("/cachoeiras")({
  head: () => ({
    meta: [
      { title: "Cachoeiras de Minas Gerais — SOL & ÁGUA" },
      { name: "description", content: "Cachoeiras, serras e cânions de Minas Gerais com alertas de segurança." },
      { property: "og:title", content: "Cachoeiras de Minas Gerais — SOL & ÁGUA" },
      { property: "og:description", content: "Cachoeiras mineiras para explorar com segurança." },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold text-nature">Cachoeiras de Minas Gerais</h1>
      <p className="mb-5 text-muted-foreground">Serras, cânions e trilhas · confirme acesso e regras antes da visita</p>
      <DestinationExplorer fixedCategory="cachoeira" />
    </div>
  ),
});