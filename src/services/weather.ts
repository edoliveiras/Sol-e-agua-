import type { Destination, MarineResult, WeatherResult } from "@/types/destination";

const stateNames: Record<string, string> = {
  MG: "Minas Gerais", RJ: "Rio de Janeiro", PE: "Pernambuco", BA: "Bahia",
};

function weatherDescription(code: number): string {
  if (code === 0) return "Céu limpo";
  if ([1, 2].includes(code)) return "Parcialmente nublado";
  if (code === 3) return "Nublado";
  if ([45, 48].includes(code)) return "Neblina";
  if ([51, 53, 55, 56, 57].includes(code)) return "Garoa";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Chuva";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Neve";
  if ([95, 96, 99].includes(code)) return "Trovoadas";
  return "Condição variável";
}

async function readJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Falha ao consultar previsão (${response.status})`);
  return response.json();
}

/** Consulta gratuita do Open-Meteo, sem chave de API. */
export async function getWeather(destination: Destination): Promise<WeatherResult> {
  try {
    let latitude = destination.coordinates?.verified ? destination.coordinates.lat : null;
    let longitude = destination.coordinates?.verified ? destination.coordinates.lng : null;

    if (latitude === null || longitude === null) {
      const geo = await readJson(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination.city)}&count=10&language=pt&format=json`);
      const results = geo.results ?? [];
      const match = results.find((item: any) => item.country_code === "BR" && (!item.admin1 || item.admin1.toLowerCase().includes((stateNames[destination.state] ?? destination.state).toLowerCase()))) ?? results.find((item: any) => item.country_code === "BR");
      if (!match) return { status: "not_connected" };
      latitude = match.latitude;
      longitude = match.longitude;
    }

    const forecast = await readJson(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America%2FSao_Paulo&forecast_days=3`,
    );
    const current = forecast.current;
    const daily = forecast.daily;
    if (!current || !daily) return { status: "not_connected" };

    return {
      status: "connected",
      source: "Open-Meteo",
      updatedAt: current.time,
      current: {
        tempC: current.temperature_2m,
        condition: weatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windKmh: current.wind_speed_10m,
      },
      forecast: daily.time.map((date: string, index: number) => ({
        date,
        tempMinC: daily.temperature_2m_min[index],
        tempMaxC: daily.temperature_2m_max[index],
        precipitationMm: daily.precipitation_sum[index],
        condition: weatherDescription(daily.weather_code[index]),
      })),
    };
  } catch {
    return { status: "error" };
  }
}

/** Ondas, marés e balneabilidade ainda dependem de integração específica. */
export async function getMarineConditions(_destination: Destination): Promise<MarineResult> {
  return { status: "not_connected" };
}
