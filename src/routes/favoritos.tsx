import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { destinations } from "@/data/destinations";
import { useFavorites } from "@/hooks/use-favorites";
import { DestinationCard } from "@/components/DestinationCard";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus favoritos — SOL & ÁGUA" },
      { name: "description", content: "Seus destinos favoritos salvos neste dispositivo." },
      { property: "og:title", content: "Meus favoritos — SOL & ÁGUA" },
      { property: "og:description", content: "Destinos salvos no SOL & ÁGUA." },
    ],
  }),
  component: FavPage,
});

function FavPage() {
  const { favorites } = useFavorites();
  const list = destinations.filter((d) => favorites.includes(d.id));
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Favoritos</h1>
      <p className="mb-5 text-muted-foreground">Salvos apenas neste dispositivo.</p>
      {list.length === 0 ? (
        <div className="rounded-2xl bg-card p-10 text-center shadow-soft">
          <Heart className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-muted-foreground">Você ainda não salvou destinos.</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground">Explorar destinos</Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((d) => <DestinationCard key={d.id} d={d} />)}</div>
      )}
    </div>
  );
}