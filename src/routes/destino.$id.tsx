import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { getDestination } from "@/data/destinations";
import { useFavorites } from "@/hooks/use-favorites";
import { directionsUrl } from "@/services/maps";
import { DemoBadge } from "@/components/DestinationCard";
import { MarinePanel, SafetyAlert, WeatherPanel } from "@/components/InfoPanels";

export const Route = createFileRoute("/destino/$id")({
  loader: ({ params }) => {
    const d = getDestination(params.id);
    if (!d) throw notFound();
    return { name: d.name, city: d.city, state: d.state, desc: d.shortDescription };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} (${loaderData.state}) — SOL & ÁGUA` },
          { name: "description", content: loaderData.desc },
          { property: "og:title", content: `${loaderData.name} — SOL & ÁGUA` },
          { property: "og:description", content: loaderData.desc },
        ]
      : [{ title: "Destino indisponível — SOL & ÁGUA" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="p-10 text-center">Destino não encontrado. <Link to="/" className="text-primary underline">Voltar</Link></div>
  ),
  component: DestinoPage,
});

function DestinoPage() {
  const { id } = Route.useParams();
  const d = getDestination(id)!;
  const [img, setImg] = useState(0);
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(d.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-5">
      <Link to={d.category === "praia" ? "/praias" : d.category === "cachoeira" ? "/cachoeiras" : "/buscar"} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>
      <div className="relative overflow-hidden rounded-3xl shadow-lift">
        <img src={d.images[img]} alt={d.name} width={1024} height={768} className="aspect-[16/10] w-full object-cover" />
        {d.isDemo && <DemoBadge className="absolute left-4 top-4" />}
      </div>
      <div className="mt-3 flex gap-2">
        {d.images.map((src, i) => (
          <button key={i} onClick={() => setImg(i)} aria-label={`Foto ${i + 1}`}
            className={`h-16 w-20 overflow-hidden rounded-xl ring-2 ${i === img ? "ring-primary" : "ring-transparent"}`}>
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {d.photoCredit ? <p className="mt-1 text-xs text-muted-foreground">Foto: <a href={d.photoSourceUrl} target="_blank" rel="noopener noreferrer" className="underline">{d.photoCredit}</a> · <a href={d.photoLicenseUrl} target="_blank" rel="noopener noreferrer" className="underline">Licença</a></p> : <p className="mt-1 text-xs text-muted-foreground">Foto ilustrativa — imagem específica do atrativo pendente.</p>}
      {d.phone && <p className="mt-3 text-sm">Telefone: <a className="underline" href={`tel:${d.phone.replace(/[^0-9+]/g, "")}`}>{d.phone}</a></p>}
      {d.whatsapp && <a className="mt-2 inline-flex rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white" href={`https://wa.me/${d.whatsapp}`} target="_blank" rel="noopener noreferrer">Consultar pelo WhatsApp</a>}
      {d.website && <p className="mt-2 text-sm"><a className="underline" href={d.website} target="_blank" rel="noopener noreferrer">Site / informações do atrativo</a></p>}
      {d.address && <p className="mt-2 text-sm text-muted-foreground">Endereço: {d.address}</p>}
      {d.locality && <p className="mt-1 text-sm text-muted-foreground">Localidade: {d.locality}</p>}
      {d.nearbyAttraction && <p className="mt-2 text-sm"><strong>Atrativo próximo:</strong> {d.nearbyAttraction}{d.distanceToAttraction ? ` · ${d.distanceToAttraction}` : " · distância não confirmada"}</p>}
      {d.amenities && d.amenities.length > 0 && <div className="mt-2"><p className="text-sm font-semibold">Comodidades informadas</p><p className="mt-1 text-sm text-muted-foreground">{d.amenities.join(" · ")}</p></div>}
      {d.priceRange && <p className="mt-2 text-sm"><strong>Faixa de diária:</strong> {d.priceRange}</p>}
      {d.ratings && d.ratings.length > 0 && <div className="mt-3"><p className="text-sm font-semibold">Avaliações publicadas</p>{d.ratings.map((rating) => <p key={rating.platform} className="text-sm text-muted-foreground">{rating.platform}: {rating.score.toFixed(1)}/{rating.scale ?? 5}{rating.reviewCount ? ` · ${rating.reviewCount} avaliações` : ""}</p>)}</div>}
      {d.sourceUrl && <p className="mt-2 text-xs text-muted-foreground"><a className="underline" href={d.sourceUrl} target="_blank" rel="noopener noreferrer">Fonte dos dados deste cadastro</a></p>}

      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-turquoise">{{ praia: "Praia", cachoeira: "Cachoeira", hotel: "Hotel", "day-use": "Day use", pousada: "Pousada", cultural: "Lugar cultural", passeio: "Passeio turístico", gastronomia: "Bares e restaurantes", evento: "Eventos" }[d.category]} · {d.region}</div>
          <h1 className="text-3xl font-extrabold">{d.name}</h1>
          <p className="mt-1 flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {d.city} - {d.state}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {d.coordinates?.verified ? `Coordenadas: ${d.coordinates.lat}, ${d.coordinates.lng}` : "Coordenadas ainda não verificadas"}
          </p>
        </div>
        <button onClick={() => toggle(d.id)} aria-label="Favoritar" className="rounded-full bg-card p-3 shadow-soft">
          <Heart className={`h-6 w-6 ${fav ? "fill-destructive text-destructive" : "text-primary"}`} />
        </button>
      </div>

      <p className="mt-4 leading-relaxed">{d.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {d.tags.map((t) => <span key={t} className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">{t}</span>)}
      </div>

      <a href={directionsUrl(d)} target="_blank" rel="noopener noreferrer"
        className="mt-6 flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-ocean text-lg font-bold text-primary-foreground shadow-lift">
        <Navigation className="h-5 w-5" /> Como chegar
      </a>
      <p className="mt-1 text-center text-xs text-muted-foreground">Abre o Google Maps — distância e tempo são calculados por lá.</p>

      <div className="mt-6 grid gap-4">
        <WeatherPanel d={d} />
        {d.category === "praia" && <MarinePanel d={d} />}
        <SafetyAlert d={d} />
      </div>
    </div>
  );
}