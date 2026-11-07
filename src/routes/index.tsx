import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Droplets, Search, Waves } from "lucide-react";
import { useState } from "react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/DestinationCard";
import { MapPlaceholder } from "@/components/InfoPanels";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOL & ÁGUA — Praias e Cachoeiras do Brasil" },
      { name: "description", content: "Consulte o tempo, descubra praias e cachoeiras incríveis e trace sua rota." },
      { property: "og:title", content: "SOL & ÁGUA — Praias e Cachoeiras do Brasil" },
      { property: "og:description", content: "Guia visual de destinos naturais brasileiros." },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative">
        <img src={"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1800"} alt="Praia tropical brasileira" width={1600} height={912} className="h-[440px] w-full object-cover md:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-photo" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-4 pb-8 text-on-photo">
          <h1 className="max-w-xl text-4xl font-extrabold leading-tight md:text-5xl">Seu próximo destino começa aqui</h1>
          <p className="mt-2 max-w-md text-base opacity-95">Consulte o tempo, descubra lugares incríveis e trace sua rota</p>
          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/buscar", search: { q } }); }} className="relative mt-5 max-w-lg">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar praia, cachoeira ou cidade"
              className="h-14 w-full rounded-2xl bg-card pl-12 pr-4 text-foreground shadow-lift outline-none focus:ring-2 focus:ring-ring" />
          </form>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section className="-mt-0 grid gap-4 pt-6 sm:grid-cols-2">
          <Link to="/praias" className="group flex items-center justify-between rounded-2xl bg-gradient-ocean p-6 text-primary-foreground shadow-lift">
            <div><Waves className="mb-3 h-9 w-9 text-sun" /><h2 className="text-2xl font-bold">Praias do Brasil</h2><p className="text-sm opacity-90">Litoral de norte a sul</p></div>
            <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/cachoeiras" className="group flex items-center justify-between rounded-2xl bg-gradient-nature p-6 text-primary-foreground shadow-lift">
            <div><Droplets className="mb-3 h-9 w-9 text-sun" /><h2 className="text-2xl font-bold">Cachoeiras de Minas Gerais</h2><p className="text-sm opacity-90">Serras, cânions e trilhas</p></div>
            <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
          </Link>
          <Link to="/buscar" className="group flex items-center justify-between rounded-2xl bg-gradient-ocean p-6 text-primary-foreground shadow-lift">
            <div><BedDouble className="mb-3 h-9 w-9 text-sun" /><h2 className="text-2xl font-bold">Hotéis, pousadas e day use</h2><p className="text-sm opacity-90">Encontre hospedagem e lazer</p></div>
            <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
          </Link>
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-2xl font-bold">Destinos em destaque</h2>
            <span className="text-xs text-muted-foreground">Conteúdo demonstrativo</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => <DestinationCard key={d.id} d={d} />)}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Explore pelo mapa</h2>
          <Link to="/mapa"><MapPlaceholder /></Link>
        </section>
      </div>
    </div>
  );
}