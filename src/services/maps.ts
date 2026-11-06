import type { Destination } from "@/types/destination";

/** Link de navegação do Google Maps. Sem cálculo de distância/tempo. */
export function directionsUrl(d: Destination): string {
  const destination =
    d.coordinates?.verified
      ? `${d.coordinates.lat},${d.coordinates.lng}`
      : `${d.name}, ${d.city} - ${d.state}, Brasil`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function searchUrl(d: Destination): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${d.name}, ${d.city} - ${d.state}, Brasil`,
  )}`;
}