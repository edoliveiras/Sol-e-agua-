import { Link } from "@tanstack/react-router";
import { BedDouble, Droplets, Heart, Home, Map, Menu, Waves, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Brand } from "./Brand";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/praias", label: "Praias", icon: Waves },
  { to: "/cachoeiras", label: "Cachoeiras", icon: Droplets },
  { to: "/buscar", label: "Hospedagem", icon: BedDouble },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" aria-label="Início"><Brand /></Link>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-primary" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-1 md:hidden">
            <Link to="/favoritos" aria-label="Favoritos" className="rounded-full p-2 text-primary hover:bg-secondary"><Heart className="h-5 w-5" /></Link>
            <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-full p-2 text-primary hover:bg-secondary">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t bg-card px-4 py-2 md:hidden">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 font-semibold">
                <n.icon className="h-5 w-5 text-turquoise" /> {n.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="mt-12 hidden border-t py-6 text-center text-sm text-muted-foreground md:block">
        SOL &amp; ÁGUA · Guia em expansão. Confirme preços, horários e acesso com os locais.
      </footer>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card md:hidden">
        <div className="grid grid-cols-6">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="flex flex-col items-center gap-1 py-2 text-[11px] font-semibold text-muted-foreground"
              activeProps={{ className: "text-primary" }}>
              <n.icon className="h-5 w-5" />
              {n.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}