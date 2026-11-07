import type { Destination, MarineResult, WeatherResult } from "@/types/destination";

const stateNames: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins",
};

function normalizeGeoName(value: string): string {
  return value.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

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

/** Consulta gratuita do Open-Meteo, sem chave. Para coordenadas ausentes, geocodifica o atrativo e depois a sede municipal. */
export async function getWeather(destination: Destination): Promise<WeatherResult> {
  try {
    let latitude = destination.coordinates?.verified ? destination.coordinates.lat : null;
    let longitude = destination.coordinates?.verified ? destination.coordinates.lng : null;

    if (latitude === null || longitude === null) {
      const stateName = stateNames[destination.state] ?? destination.state;
      const queries = [destination.name, destination.city].filter((value, index, all) => all.indexOf(value) === index);
      let match: any = null;
      for (const query of queries) {
        const geo = await readJson(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=20&language=pt&format=json`);
        const results = geo.results ?? [];
        match = results.find((item: any) => item.country_code === "BR" && item.admin1?.toLowerCase().includes(stateName.toLowerCase()) && normalizeGeoName(item.name) === normalizeGeoName(query))
          ?? results.find((item: any) => item.country_code === "BR" && item.admin1?.toLowerCase().includes(stateName.toLowerCase()))
          ?? null;
        if (match) break;
      }
      if (!match) return { status: "not_connected" };
      latitude = match.latitude;
      longitude = match.longitude;
    }

    const forecast = await readJson(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=3`,
    );
    const current = forecast.current;
    const daily = forecast.daily;
    if (!current || !daily) return { status: "not_connected" };
    const currentHourIndex = Math.max(0, forecast.hourly?.time?.findIndex((time: string) => time >= current.time) ?? 0);

    return {
      status: "connected",
      source: "Open-Meteo",
      updatedAt: current.time,
      current: {
        tempC: current.temperature_2m,
        condition: weatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windKmh: current.wind_speed_10m,
        rainProbability: forecast.hourly?.precipitation_probability?.[currentHourIndex] ?? null,
      },
      forecast: daily.time.map((date: string, index: number) => ({
        date,
        tempMinC: daily.temperature_2m_min[index],
        tempMaxC: daily.temperature_2m_max[index],
        precipitationMm: daily.precipitation_sum[index],
        rainProbability: daily.precipitation_probability_max?.[index] ?? null,
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
