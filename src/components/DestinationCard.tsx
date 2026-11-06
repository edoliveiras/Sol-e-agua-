import { Link } from "@tanstack/react-router";
import { Heart, MapPin } from "lucide-react";
import type { Destination } from "@/types/destination";
import { useFavorites } from "@/hooks/use-favorites";

export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`rounded-full bg-sun px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sun-foreground ${className}`}>
      Demonstração
    </span>
  );
}

export function DestinationCard({ d }: { d: Destination }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(d.id);
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card shadow-soft transition hover:shadow-lift">
      <Link to="/destino/$id" params={{ id: d.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={d.images[0]} alt={d.name} loading="lazy" width={1024} height={768}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          {d.isDemo && <DemoBadge className="absolute left-3 top-3" />}
        </div>
        <div className="p-4">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-turquoise">
            {d.category === "praia" ? "Praia" : "Cachoeira"}
          </div>
          <h3 className="text-lg font-bold">{d.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {d.city} - {d.state}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{d.shortDescription}</p>
        </div>
      </Link>
      <button onClick={() => toggle(d.id)} aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        className="absolute right-3 top-3 rounded-full bg-card/90 p-2 shadow-soft">
        <Heart className={`h-5 w-5 ${fav ? "fill-destructive text-destructive" : "text-primary"}`} />
      </button>
    </div>
  );
}