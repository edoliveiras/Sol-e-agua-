export type Category = "praia" | "cachoeira";
export type Region = "Sudeste" | "Nordeste" | "Sul" | "Norte" | "Centro-Oeste";

export interface Coordinates {
  lat: number;
  lng: number;
  /** Só exibir quando verificado em fonte oficial. */
  verified: boolean;
}

export interface Destination {
  id: string;
  name: string;
  category: Category;
  city: string;
  state: string; // UF
  region: Region;
  shortDescription: string;
  description: string;
  images: string[];
  coordinates: Coordinates | null;
  tags: string[];
  /** true = conteúdo de exemplo, ainda não verificado */
  isDemo: boolean;
}

/** Contratos para futuras integrações */
export interface WeatherForecast {
  date: string;
  tempMinC: number;
  tempMaxC: number;
  precipitationMm: number;
  condition: string;
}

export interface WeatherResult {
  status: "connected" | "not_connected" | "error";
  source?: string;
  updatedAt?: string;
  current?: { tempC: number; condition: string; humidity: number; windKmh: number };
  forecast?: WeatherForecast[];
}

export interface MarineResult {
  status: "connected" | "not_connected" | "error";
  source?: string;
  waveHeightM?: number;
  tides?: { time: string; type: "alta" | "baixa"; heightM: number }[];
}