import type { Destination } from "@/types/destination";

// Expansão do catálogo com praias identificadas em portais públicos estaduais e municipais.
// Coordenadas e serviços individuais permanecem pendentes de validação; não são estimados.
const image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";
type BeachInput = { id:string; name:string; city:string; state:string; region:"Sudeste"|"Sul"|"Norte"; sourceUrl:string; description?:string };
const make = (b:BeachInput):Destination => ({
 id:b.id,name:b.name,category:"praia",city:b.city,state:b.state,region:b.region,
 shortDescription:`${b.name} — praia em ${b.city}, ${b.state}.`,
 description:b.description??`${b.name} é um destino de praia em ${b.city}, ${b.state}. Consulte condições de banho, balneabilidade, acesso e orientações ambientais nos canais oficiais antes da visita. Cadastro geográfico e serviços locais aguardam validação.`,
 images:[image],coordinates:null,tags:["Praia",b.state,"Catálogo em expansão"],isDemo:true,sourceUrl:b.sourceUrl,
});
export const outrasPraiasBrasil:Destination[]=[
 // ESPÍRITO SANTO — Portal oficial do Governo do ES
 ...([
 ["es-guarapari-morro","Praia do Morro","Guarapari"],["es-guarapari-castanheiras","Praia das Castanheiras","Guarapari"],["es-guarapari-namorados","Praia dos Namorados","Guarapari"],["es-guarapari-areia-preta","Praia da Areia Preta","Guarapari"],["es-vitoria-camburi","Praia de Camburi","Vitória"],["es-vitoria-curva-jurema","Curva da Jurema","Vitória"],["es-vila-velha-costa","Praia da Costa","Vila Velha"],["es-vila-velha-ita-poa","Praia de Itapoã","Vila Velha"],["es-vila-velha-coqueiral","Praia de Coqueiral de Itaparica","Vila Velha"],["es-serra-jacaraipe","Praia de Jacaraípe","Serra"],["es-conceicao-itaunas","Praia de Itaúnas","Conceição da Barra"],["es-sao-mateus-guriri","Praia de Guriri","São Mateus"],["es-anchieta-padres","Praia dos Padres","Anchieta"],["es-anchieta-iriri","Praias de Iriri","Anchieta"],["es-linhares-pontal-ipiranga","Praia de Pontal do Ipiranga","Linhares"],["es-linhares-regencia","Praia de Regência","Linhares"],["es-aracruz-barra-sahy","Praia da Barra do Sahy","Aracruz"],["es-conceicao-riacho-doce","Praia de Riacho Doce","Conceição da Barra"],
 ] as string[][]).map(([id,name,city])=>make({id,name,city,state:"ES",region:"Sudeste",sourceUrl:"https://www.es.gov.br/turismo/praias"})),
 // SÃO PAULO — Portal oficial do Governo de SP
 ...([
 ["sp-guaruja-enseada","Praia da Enseada","Guarujá"],["sp-guaruja-tombo","Praia do Tombo","Guarujá"],["sp-santos-gonzaga","Praia do Gonzaga","Santos"],["sp-sao-vicente-itarare","Praia do Itararé","São Vicente"],["sp-praia-grande-boqueirao","Praia do Boqueirão","Praia Grande"],["sp-ubatuba-itamambuca","Praia de Itamambuca","Ubatuba"],["sp-ubatuba-grande","Praia Grande","Ubatuba"],["sp-ubatuba-maranduba","Praia de Maranduba","Ubatuba"],["sp-ilhabela-curral","Praia do Curral","Ilhabela"],["sp-ilhabela-castelhanos","Praia dos Castelhanos","Ilhabela"],["sp-bertioga-enseada","Praia da Enseada","Bertioga"],["sp-peruibe-guarau","Praia do Guaraú","Peruíbe"],["sp-cananeia-pereirinha","Praia do Pereirinha","Cananéia"],
 ] as string[][]).map(([id,name,city])=>make({id,name,city,state:"SP",region:"Sudeste",sourceUrl:"https://www.sp.gov.br/sp/conheca-sp/praias-estancias/"})),
 // PARANÁ — Secretaria de Estado do Turismo
 ...([
 ["pr-matinhos-caioba-brava","Praia Brava de Caiobá","Matinhos"],["pr-matinhos-caioba-mansa","Praia Mansa de Caiobá","Matinhos"],["pr-guaratuba-central","Praia Central","Guaratuba"],["pr-guaratuba-brejatuba","Praia de Brejatuba","Guaratuba"],["pr-guaratuba-coroados","Praia de Coroados","Guaratuba"],["pr-guaratuba-caieiras","Praia de Caieiras","Guaratuba"],["pr-pontal-praia-leste","Praia de Leste","Pontal do Paraná"],["pr-pontal-shangrila","Praia de Shangri-lá","Pontal do Paraná"],["pr-pontal-ipanema","Praia de Ipanema","Pontal do Paraná"],["pr-pontal-pontal-sul","Praia de Pontal do Sul","Pontal do Paraná"],["pr-ilha-mel-encantadas","Praia de Encantadas","Paranaguá"],["pr-ilha-mel-farol","Praia do Farol","Paranaguá"],["pr-ilha-mel-fortaleza","Praia da Fortaleza","Paranaguá"],["pr-guaraquecaba-deserta","Praia Deserta","Guaraqueçaba"],
 ] as string[][]).map(([id,name,city])=>make({id,name,city,state:"PR",region:"Sul",sourceUrl:"https://www.turismo.pr.gov.br/Pagina/TURISMO-DE-LAZER-SOL-PRAIA"})),
 // RIO GRANDE DO SUL — portais oficiais de turismo
 ...([
 ["rs-torres-guarita","Praia da Guarita","Torres"],["rs-torres-grande","Praia Grande","Torres"],["rs-torres-molhes","Praia dos Molhes","Torres"],["rs-torres-cal","Praia da Cal","Torres"],["rs-torres-itapeva","Praia de Itapeva","Torres"],["rs-capao-canoa","Praia de Capão da Canoa","Capão da Canoa"],["rs-tramandai","Praia de Tramandaí","Tramandaí"],["rs-cassino","Praia do Cassino","Rio Grande"],["rs-hermenegildo","Praia do Hermenegildo","Santa Vitória do Palmar"],["rs-barra-chui","Praia da Barra do Chuí","Santa Vitória do Palmar"],
 ] as string[][]).map(([id,name,city])=>make({id,name,city,state:"RS",region:"Sul",sourceUrl:"https://estado.rs.gov.br/turismo"})),
 // PARÁ — prefeitura de Salinópolis e destinos públicos do Pará
 ...([
 ["pa-salinopolis-atalaia","Praia do Atalaia","Salinópolis"],["pa-salinopolis-farol-velho","Praia do Farol Velho","Salinópolis"],["pa-salinopolis-corvina","Praia da Corvina","Salinópolis"],["pa-salinopolis-macarico","Praia do Maçarico","Salinópolis"],["pa-santarem-alter-chao","Praia de Alter do Chão","Santarém"],["pa-mosqueiro-murubira","Praia do Murubira","Belém"],["pa-mosqueiro-chapeu-virado","Praia do Chapéu Virado","Belém"],["pa-mosqueiro-paraiso","Praia do Paraíso","Belém"],["pa-maruda-algodoal","Praia de Algodoal","Maracanã"],
 ] as string[][]).map(([id,name,city])=>make({id,name,city,state:"PA",region:"Norte",sourceUrl:"https://salinopolis.pa.gov.br/o-municipio/turismo-e-lazer/"})),
];
