import type { Destination, MarineResult, WeatherResult } from "@/types/destination";

/**
 * Camada de serviço de clima. Nenhuma fonte meteorológica está conectada ainda.
 * Para integrar: implemente a chamada a uma API (via função de servidor) e
 * retorne status "connected" com dados reais.
 */
export async function getWeather(_destination: Destination): Promise<WeatherResult> {
  return { status: "not_connected" };
}

/** Condições do mar / ondas / marés — apenas para destinos costeiros. */
export async function getMarineConditions(_destination: Destination): Promise<MarineResult> {
  return { status: "not_connected" };
}