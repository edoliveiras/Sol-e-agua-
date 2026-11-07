import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { destinations, REGIONS, STATES } from "@/data/destinations";
import type { Category } from "@/types/destination";
import { DestinationCard } from "./DestinationCard";

export function matchesQuery(text: string, q: string) {
  const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return norm(text).includes(norm(q));
}

const selectCls = "h-11 rounded-xl border bg-card px-3 text-sm font-semibold";

export function DestinationExplorer({ fixedCategory, initialQuery = "" }: { fixedCategory?: Category; initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [cat, setCat] = useState<string>(fixedCategory ?? "");

  const list = useMemo(
    () =>
      destinations.filter(
        (d) =>
          (!q || matchesQuery(`${d.name} ${d.city} ${d.state} ${d.tags.join(" ")} ${(d.amenities ?? []).join(" ")} ${d.address ?? ""}`, q)) &&
          (!state || d.state === state) &&
          (!region || d.region === region) &&
          (!cat || d.category === cat),
      ),
    [q, state, region, cat],
  );

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar praia, cachoeira, hospedagem ou cidade"
          className="h-12 w-full rounded-2xl border bg-card pl-12 pr-4 shadow-soft outline-none focus:ring-2 focus:ring-ring" />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <select aria-label="Estado" value={state} onChange={(e) => setState(e.target.value)} className={selectCls}>
          <option value="">Todos os estados</option>
          {STATES.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select aria-label="Região" value={region} onChange={(e) => setRegion(e.target.value)} className={selectCls}>
          <option value="">Todas as regiões</option>
          {REGIONS.map((r) => <option key={r}>{r}</option>)}
        </select>
        {!fixedCategory && (
          <select aria-label="Categoria" value={cat} onChange={(e) => setCat(e.target.value)} className={selectCls}>
            <option value="">Todas as categorias</option>
            <option value="praia">Praias</option>
            <option value="cachoeira">Cachoeiras</option>
            <option value="hotel">Hotéis</option>
            <option value="day-use">Day use</option>
            <option value="pousada">Pousadas</option>
            <option value="cultural">Lugares culturais</option>
            <option value="passeio">Passeios turísticos</option>
            <option value="gastronomia">Bares e restaurantes</option>
            <option value="evento">Eventos</option>
          </select>
        )}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => <DestinationCard key={d.id} d={d} />)}
      </div>
      {list.length === 0 && <p className="mt-10 text-center text-muted-foreground">Nenhum destino encontrado.</p>}
    </div>
  );
}