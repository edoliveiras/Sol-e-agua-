import type { Destination } from "@/types/destination";

/**
 * DADOS DE EXEMPLO — textos descritivos genéricos para o protótipo.
 * Fotos são ilustrativas. Coordenadas ficam nulas até verificação oficial.
 */
export const destinations: Destination[] = [
  {
    id: "copacabana",
    name: "Praia de Copacabana",
    category: "praia",
    city: "Rio de Janeiro",
    state: "RJ",
    region: "Sudeste",
    shortDescription: "Orla icônica com calçadão e vista para o Pão de Açúcar.",
    description:
      "Uma das praias urbanas mais conhecidas do mundo, com extensa faixa de areia, calçadão em ondas e intensa vida cultural ao longo da orla.",
    images: ["https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200"],
    coordinates: null,
    tags: ["Urbana", "Calçadão", "Esportes"],
    isDemo: true,
  },
  {
    id: "porto-de-galinhas",
    name: "Porto de Galinhas",
    category: "praia",
    city: "Ipojuca",
    state: "PE",
    region: "Nordeste",
    shortDescription: "Piscinas naturais de águas claras e jangadas coloridas.",
    description:
      "Destino famoso pelas piscinas naturais formadas entre recifes, acessadas de jangada conforme as condições do mar. Consulte operadores locais antes do passeio.",
    images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200"],
    coordinates: null,
    tags: ["Piscinas naturais", "Jangada", "Família"],
    isDemo: true,
  },
  {
    id: "praia-do-forte",
    name: "Praia do Forte",
    category: "praia",
    city: "Mata de São João",
    state: "BA",
    region: "Nordeste",
    shortDescription: "Coqueirais, piscinas de recife e vila charmosa.",
    description:
      "Vila litorânea cercada de coqueiros, com praias de recifes e uma atmosfera tranquila, conhecida também por projetos de conservação marinha.",
    images: ["https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1200"],
    coordinates: null,
    tags: ["Coqueiral", "Vila", "Conservação"],
    isDemo: true,
  },
  {
    id: "cachoeira-do-tabuleiro",
    name: "Cachoeira do Tabuleiro",
    category: "cachoeira",
    city: "Conceição do Mato Dentro",
    state: "MG",
    region: "Sudeste",
    shortDescription: "Queda d'água monumental entre paredões de rocha.",
    description:
      "Uma das cachoeiras mais altas de Minas Gerais, inserida em área de conservação. O acesso envolve trilha; verifique horários e regras da unidade antes de ir.",
    images: ["https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200"],
    coordinates: null,
    tags: ["Trilha", "Mirante", "Unidade de conservação"],
    isDemo: true,
  },
  {
    id: "serra-do-cipo",
    name: "Serra do Cipó",
    category: "cachoeira",
    city: "Santana do Riacho",
    state: "MG",
    region: "Sudeste",
    shortDescription: "Campos rupestres, cânions e diversas cachoeiras.",
    description:
      "Região serrana com paisagens de campos rupestres e muitas quedas d'água acessíveis por trilhas de diferentes níveis de dificuldade.",
    images: ["https://images.unsplash.com/photo-1511497584788-876760111969?w=1200"],
    coordinates: null,
    tags: ["Trilhas", "Campos rupestres", "Ecoturismo"],
    isDemo: true,
  },
  {
    id: "capitolio",
    name: "Capitólio",
    category: "cachoeira",
    city: "Capitólio",
    state: "MG",
    region: "Sudeste",
    shortDescription: "Cânions de águas esmeralda e cachoeiras em paredões.",
    description:
      "Conhecida pelos cânions às margens do lago e por cachoeiras em paredões rochosos. Passeios dependem de condições climáticas e de avisos das autoridades locais.",
    images: ["https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200"],
    coordinates: null,
    tags: ["Cânions", "Passeio de barco", "Lago"],
    isDemo: true,
  },
];

export const getDestination = (id: string) => destinations.find((d) => d.id === id);
export const STATES = Array.from(new Set(destinations.map((d) => d.state))).sort();
export const REGIONS = Array.from(new Set(destinations.map((d) => d.region))).sort();