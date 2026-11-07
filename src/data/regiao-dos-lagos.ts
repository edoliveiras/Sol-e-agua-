import type { Destination } from "@/types/destination";

// Cadastro regional inicial. Fotos ilustrativas; dados de acesso e serviços devem ser confirmados localmente.
const beachImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";

const beach = (
  id: string,
  name: string,
  city: string,
  kind: "oceânica" | "lagunar" = "oceânica",
): Destination => ({
  id,
  name,
  category: "praia",
  city,
  state: "RJ",
  region: "Sudeste",
  shortDescription: `${kind === "lagunar" ? "Praia às margens da Lagoa de Araruama" : "Praia do litoral fluminense"} · ${city}, Região dos Lagos.`,
  description: `${name} fica em ${city}, na Região dos Lagos do Rio de Janeiro. Consulte as condições do mar ou da lagoa, balneabilidade, acessos, regras ambientais e serviços locais antes da visita. A imagem desta ficha é ilustrativa.`,
  images: [beachImage],
  coordinates: null,
  tags: ["Região dos Lagos", "RJ", kind === "lagunar" ? "Lagoa" : "Mar"],
  isDemo: true,
});

export const regiaoDosLagosBeaches: Destination[] = [
  // Arraial do Cabo
  beach("arraial-praia-do-farol", "Praia do Farol", "Arraial do Cabo"),
  beach("arraial-prainhas-pontal-atalaia", "Prainhas do Pontal do Atalaia", "Arraial do Cabo"),
  beach("arraial-praia-do-forno", "Praia do Forno", "Arraial do Cabo"),
  beach("arraial-praia-grande", "Praia Grande", "Arraial do Cabo"),
  beach("arraial-prainha", "Prainha", "Arraial do Cabo"),
  beach("arraial-praia-do-pontal", "Praia do Pontal", "Arraial do Cabo"),
  beach("arraial-praia-da-figueira", "Praia da Figueira", "Arraial do Cabo"),
  beach("arraial-praia-de-monte-alto", "Praia de Monte Alto", "Arraial do Cabo"),
  beach("arraial-praia-pernambuca", "Praia de Pernambuca", "Arraial do Cabo"),
  beach("arraial-praia-lagunar-caicara", "Praia Lagunar Caiçara", "Arraial do Cabo", "lagunar"),

  // Armação dos Búzios
  beach("buzios-geriba", "Praia de Geribá", "Armação dos Búzios"),
  beach("buzios-ferradura", "Praia da Ferradura", "Armação dos Búzios"),
  beach("buzios-ferradurinha", "Praia da Ferradurinha", "Armação dos Búzios"),
  beach("buzios-joao-fernandes", "Praia de João Fernandes", "Armação dos Búzios"),
  beach("buzios-joao-fernandinho", "Praia de João Fernandinho", "Armação dos Búzios"),
  beach("buzios-azeda", "Praia da Azeda", "Armação dos Búzios"),
  beach("buzios-azedinha", "Praia da Azedinha", "Armação dos Búzios"),
  beach("buzios-ossos", "Praia dos Ossos", "Armação dos Búzios"),
  beach("buzios-armacao", "Praia da Armação", "Armação dos Búzios"),
  beach("buzios-brava", "Praia Brava", "Armação dos Búzios"),
  beach("buzios-forno", "Praia do Forno", "Armação dos Búzios"),
  beach("buzios-tartaruga", "Praia da Tartaruga", "Armação dos Búzios"),
  beach("buzios-manguinhos", "Praia de Manguinhos", "Armação dos Búzios"),
  beach("buzios-rasa", "Praia Rasa", "Armação dos Búzios"),
  beach("buzios-tucuns", "Praia de Tucuns", "Armação dos Búzios"),
  beach("buzios-jose-goncalves", "Praia de José Gonçalves", "Armação dos Búzios"),
  beach("buzios-caravelas", "Praia das Caravelas", "Armação dos Búzios"),
  beach("buzios-canto", "Praia do Canto", "Armação dos Búzios"),

  // Cabo Frio
  beach("cabofrio-forte", "Praia do Forte", "Cabo Frio"),
  beach("cabofrio-pero", "Praia do Peró", "Cabo Frio"),
  beach("cabofrio-conchas", "Praia das Conchas", "Cabo Frio"),
  beach("cabofrio-foguete", "Praia do Foguete", "Cabo Frio"),
  beach("cabofrio-dunas", "Praia das Dunas", "Cabo Frio"),
  beach("cabofrio-brava", "Praia Brava", "Cabo Frio"),
  beach("cabofrio-unamar", "Praia de Unamar", "Cabo Frio"),
  beach("cabofrio-pontal-do-pero", "Praia do Pontal do Peró", "Cabo Frio"),
  beach("cabofrio-siqueira", "Praia do Siqueira", "Cabo Frio", "lagunar"),

  // Saquarema
  beach("saquarema-itauna", "Praia de Itaúna", "Saquarema"),
  beach("saquarema-vila", "Praia da Vila", "Saquarema"),
  beach("saquarema-prainha", "Prainha", "Saquarema"),
  beach("saquarema-boqueirao", "Praia do Boqueirão", "Saquarema"),
  beach("saquarema-jacone", "Praia de Jaconé", "Saquarema"),
  beach("saquarema-vilatur", "Praia de Vilatur", "Saquarema"),
  beach("saquarema-massambaba", "Praia de Massambaba", "Saquarema"),
  beach("saquarema-barra-nova", "Praia de Barra Nova", "Saquarema"),
  beach("saquarema-gravata", "Praia do Gravatá", "Saquarema"),

  // Araruama
  beach("araruama-praia-seca", "Praia Seca", "Araruama"),
  beach("araruama-pontinha", "Praia da Pontinha", "Araruama", "lagunar"),
  beach("araruama-coqueiral", "Praia do Coqueiral", "Araruama", "lagunar"),
  beach("araruama-centro", "Praia do Centro", "Araruama", "lagunar"),
  beach("araruama-barbudo", "Praia do Barbudo", "Araruama", "lagunar"),
  beach("araruama-iguabinha", "Praia de Iguabinha", "Araruama", "lagunar"),
  beach("araruama-bananeiras", "Praia de Bananeiras", "Araruama", "lagunar"),
  beach("araruama-gaviao", "Praia do Gavião", "Araruama", "lagunar"),
  beach("araruama-areal", "Praia de Areal", "Araruama", "lagunar"),
  beach("araruama-tome", "Praia do Tomé", "Araruama", "lagunar"),

  // Iguaba Grande
  beach("iguaba-centro", "Praia do Centro", "Iguaba Grande", "lagunar"),
  beach("iguaba-ubas", "Praia dos Ubás", "Iguaba Grande", "lagunar"),
  beach("iguaba-popeye", "Praia do Popeye", "Iguaba Grande", "lagunar"),
  beach("iguaba-cidade-nova", "Praia de Cidade Nova", "Iguaba Grande", "lagunar"),
  beach("iguaba-capivara", "Praia da Capivara", "Iguaba Grande", "lagunar"),
  beach("iguaba-sampaio", "Praia de Sampaio", "Iguaba Grande", "lagunar"),

  // São Pedro da Aldeia
  beach("sao-pedro-sudoeste", "Praia do Sudoeste", "São Pedro da Aldeia", "lagunar"),
  beach("sao-pedro-pitoria", "Praia da Pitória", "São Pedro da Aldeia", "lagunar"),
  beach("sao-pedro-sol", "Praia do Sol", "São Pedro da Aldeia", "lagunar"),
  beach("sao-pedro-linda", "Praia Linda", "São Pedro da Aldeia", "lagunar"),
  beach("sao-pedro-balneario", "Praia do Balneário", "São Pedro da Aldeia", "lagunar"),
  beach("sao-pedro-ponta-da-areia", "Praia da Ponta da Areia", "São Pedro da Aldeia", "lagunar"),
  beach("sao-pedro-pedras-sapiatiba", "Praia das Pedras de Sapiatiba", "São Pedro da Aldeia", "lagunar"),
];
