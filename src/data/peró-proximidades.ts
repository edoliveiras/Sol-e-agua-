import type { Destination } from "@/types/destination";

// Cadastro confirmado de serviços e programação no entorno da Praia do Peró.
// Distâncias, preços e horários só são preenchidos quando publicados pelas fontes.
const image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";
const base = {
  city: "Cabo Frio", state: "RJ", region: "Sudeste" as const,
  images: [image], coordinates: null, isDemo: false,
  tags: ["Praia do Peró", "Cabo Frio", "Região dos Lagos"],
};

export const peroNearby: Destination[] = [
  {
    ...base, id: "pero-paradiso-pero-praia-hotel", name: "Paradiso Peró Praia Hotel", category: "hotel",
    shortDescription: "Hotel à beira-mar na Praia do Peró.",
    description: "Hotel localizado diretamente na Praia do Peró. O estabelecimento informa restaurante, piscina climatizada, sauna e estrutura de lazer. Endereço: Rua dos Badejos, s/n, Lote 23, Peró, Cabo Frio - RJ, CEP 28924-178. Telefone divulgado no diretório: (22) 98813-0185. Consulte o hotel para tarifas e disponibilidade.",
    address: "Rua dos Badejos, s/n, Lote 23, Peró, Cabo Frio - RJ, 28924-178",
    phone: "(22) 98813-0185", whatsapp: "5522988130185",
    website: "https://paradisoperopraiahotel.com.br/", instagram: "https://www.instagram.com/paradisopero/",
    ratings: [{ platform: "Google", score: 4.8, scale: 5, reviewCount: 2411 }],
    sourceUrl: "https://www.fcvbrj.org.br/convention/Hoteis/cabo-frio",
    amenities: ["Restaurante", "Piscina climatizada", "Sauna", "Acesso à praia"],
  },
  {
    ...base, id: "pero-pousada-sun-victory", name: "Pousada Sun Victory", category: "pousada",
    shortDescription: "Pousada no bairro Peró, próxima à praia.",
    description: "Pousada situada na Rua Anequim, 125, Peró, Cabo Frio - RJ, CEP 28923-420. Telefone divulgado: (22) 2648-3525. A fonte de avaliações consultada registra nota Google 4,3/5 com 94 avaliações. Confirme diretamente tarifas e disponibilidade.",
    address: "Rua Anequim, 125, Peró, Cabo Frio - RJ, 28923-420", phone: "(22) 2648-3525",
    ratings: [{ platform: "Google", score: 4.3, scale: 5, reviewCount: 94 }],
    sourceUrl: "https://www.turismo.rj.gov.br/cidades/cabo-frio/",
  },
  {
    ...base, id: "pero-pousada-bellmar", name: "Pousada Bellmar Peró", category: "pousada",
    shortDescription: "Pousada no bairro Peró.",
    description: "Pousada localizada na Rua Getúlio Vargas, 98, Peró, Cabo Frio - RJ, CEP 28924-204. Telefone divulgado: (22) 99708-2553. A fonte de avaliações consultada registra nota Google 5,0/5 com 36 avaliações. Preços e horários não publicados na fonte consultada.",
    address: "Rua Getúlio Vargas, 98, Peró, Cabo Frio - RJ, 28924-204", phone: "(22) 99708-2553", whatsapp: "5522997082553",
    ratings: [{ platform: "Google", score: 5.0, scale: 5, reviewCount: 36 }],
    sourceUrl: "https://www.google.com/maps/search/?api=1&query=Pousada+Bellmar+Pero+Cabo+Frio",
  },
  {
    ...base, id: "pero-restaurante-torres-gemeas", name: "Restaurante Torres Gêmeas", category: "gastronomia",
    shortDescription: "Restaurante, bar e pizzaria no Shopping do Peró.",
    description: "Restaurante na Avenida dos Pescadores, 650, Peró, Cabo Frio - RJ, CEP 28922-175. Telefone: (22) 99745-3094. Horários divulgados: segunda a quarta 12h–22h; quinta 12h–22h; sexta e sábado 12h–23h; domingo 12h–22h. A fonte consultada registra nota Google 4,4/5 com 347 avaliações. Faixa de preço não confirmada.",
    address: "Av. dos Pescadores, 650, Peró, Cabo Frio - RJ, 28922-175", phone: "(22) 99745-3094", whatsapp: "5522997453094",
    ratings: [{ platform: "Google", score: 4.4, scale: 5, reviewCount: 347 }],
    sourceUrl: "https://www.google.com/maps/search/?api=1&query=Restaurante+Torres+Gemeas+Pero+Cabo+Frio",
  },
  {
    ...base, id: "pero-esquina-do-chopp", name: "Esquina do Chopp", category: "gastronomia",
    shortDescription: "Bar e pub no Shopping do Peró.",
    description: "Bar/pub na Avenida dos Pescadores, Peró, Cabo Frio - RJ, CEP 28922-175. Telefone divulgado: (21) 97977-4257. Horários publicados: quarta e quinta 17h–23h; sexta 17h–0h; sábado e domingo 12h–0h. A fonte consultada registra nota Google 4,1/5 com 47 avaliações. Confirme o horário antes de sair.",
    address: "Av. dos Pescadores, Shopping do Peró, Cabo Frio - RJ, 28922-175", phone: "(21) 97977-4257", whatsapp: "5521979774257",
    ratings: [{ platform: "Google", score: 4.1, scale: 5, reviewCount: 47 }],
    sourceUrl: "https://www.google.com/maps/search/?api=1&query=Esquina+do+Chopp+Pero+Cabo+Frio",
  },
  {
    ...base, id: "pero-quintal-da-praia", name: "Quintal da Praia", category: "gastronomia",
    shortDescription: "Bar e restaurante no Peró Shopping.",
    description: "Restaurante/bar no interior do Peró Shopping, Avenida dos Pescadores, 48, lojas 17 e 18, Peró, Cabo Frio - RJ. Telefone divulgado: (22) 99910-9208. Horários publicados: segunda 17h–23h50; terça 17h–23h50; quarta 17h–23h30; quinta e sexta 17h–0h; sábado 17h–0h; domingo 14h–0h. A fonte consultada registra nota Google 5,0/5 com 2 avaliações.",
    address: "Av. dos Pescadores, 48, lojas 17 e 18, Peró Shopping, Cabo Frio - RJ", phone: "(22) 99910-9208", whatsapp: "5522999109208",
    ratings: [{ platform: "Google", score: 5.0, scale: 5, reviewCount: 2 }],
    sourceUrl: "https://www.google.com/maps/search/?api=1&query=Quintal+da+Praia+Pero+Cabo+Frio",
  },
  {
    ...base, id: "pero-pizzaria-pero-pizza-quadrada", name: "Pizzaria Peró | Pizza Quadrada", category: "gastronomia",
    shortDescription: "Pizzaria e delivery no bairro Peró.",
    description: "Pizzaria na Rua do Moinho, 58, loja 01, Peró, Cabo Frio - RJ, CEP 28922-235. Telefone divulgado: (22) 2643-5918. Horários publicados: segunda 18h–22h50; terça a quinta 18h–22h50; sexta e sábado 18h–23h; domingo 18h–22h50. A fonte consultada registra nota Google 1,0/5 com 1 avaliação; amostra muito pequena. Faixa de preço indicada como econômica ($).",
    address: "Rua do Moinho, 58, loja 01, Peró, Cabo Frio - RJ, 28922-235", phone: "(22) 2643-5918",
    priceRange: "$", ratings: [{ platform: "Google", score: 1.0, scale: 5, reviewCount: 1 }],
    sourceUrl: "https://www.google.com/maps/search/?api=1&query=Pizzaria+Pero+Pizza+Quadrada+Cabo+Frio",
  },
  {
    ...base, id: "pero-morro-do-vigia", name: "Morro do Vigia", category: "passeio",
    shortDescription: "Mirante natural e trilha costeira entre as praias do Peró e das Conchas.",
    description: "Atrativo natural no bairro Peró, Cabo Frio - RJ, com trilha e mirantes voltados para a Praia do Peró e a Praia das Conchas. Endereço de referência: Morro do Vigia, Peró, Cabo Frio - RJ. A fonte consultada registra nota Google 4,8/5 com 600 avaliações. Acesso e condições da trilha devem ser verificados localmente.",
    address: "Morro do Vigia, Peró, Cabo Frio - RJ",
    ratings: [{ platform: "Google", score: 4.8, scale: 5, reviewCount: 600 }],
    sourceUrl: "https://www.turismo.rj.gov.br/cidades/cabo-frio/",
  },
  {
    ...base, id: "pero-luau-paradiso-2026-11-14", name: "Luau no Peró — 14 de novembro de 2026", category: "evento",
    shortDescription: "Programação de luau anunciada para sábado de novembro no Paradiso Peró.",
    description: "O site oficial do Paradiso Peró anuncia Luau no Peró aos sábados de novembro. Data desta edição: 14/11/2026. Local: Paradiso Peró Praia Hotel, Rua dos Badejos, s/n, Peró, Cabo Frio - RJ. Preço/ingresso não informado na publicação consultada; confirme com o organizador.",
    address: "Paradiso Peró Praia Hotel, Rua dos Badejos, s/n, Peró, Cabo Frio - RJ",
    website: "https://paradisoperopraiahotel.com.br/", sourceUrl: "https://paradisoperopraiahotel.com/",
  },
  {
    ...base, id: "pero-luau-paradiso-2026-11-21", name: "Luau no Peró — 21 de novembro de 2026", category: "evento",
    shortDescription: "Programação de luau anunciada para sábado de novembro no Paradiso Peró.",
    description: "O site oficial do Paradiso Peró anuncia Luau no Peró aos sábados de novembro. Data desta edição: 21/11/2026. Local: Paradiso Peró Praia Hotel, Rua dos Badejos, s/n, Peró, Cabo Frio - RJ. Preço/ingresso não informado na publicação consultada; confirme com o organizador.",
    address: "Paradiso Peró Praia Hotel, Rua dos Badejos, s/n, Peró, Cabo Frio - RJ",
    website: "https://paradisoperopraiahotel.com.br/", sourceUrl: "https://paradisoperopraiahotel.com/",
  },
  {
    ...base, id: "pero-luau-paradiso-2026-11-28", name: "Luau no Peró — 28 de novembro de 2026", category: "evento",
    shortDescription: "Programação de luau anunciada para sábado de novembro no Paradiso Peró.",
    description: "O site oficial do Paradiso Peró anuncia Luau no Peró aos sábados de novembro. Data desta edição: 28/11/2026. Local: Paradiso Peró Praia Hotel, Rua dos Badejos, s/n, Peró, Cabo Frio - RJ. Preço/ingresso não informado na publicação consultada; confirme com o organizador.",
    address: "Paradiso Peró Praia Hotel, Rua dos Badejos, s/n, Peró, Cabo Frio - RJ",
    website: "https://paradisoperopraiahotel.com.br/", sourceUrl: "https://paradisoperopraiahotel.com/",
  },
];
