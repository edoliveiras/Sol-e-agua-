import type { Destination } from "@/types/destination";

// Expansão do catálogo com praias identificadas em portais públicos estaduais e municipais.
// Coordenadas e serviços individuais permanecem pendentes de validação; não são estimados.
const image = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200";
type BeachInput = { id:string; name:string; city:string; state:string; region:"Sudeste"|"Sul"|"Norte"; sourceUrl?:string; description?:string };
const make = (b:BeachInput):Destination => ({
 id:b.id,name:b.name,category:"praia",city:b.city,state:b.state,region:b.region,
 shortDescription:`${b.name} — praia em ${b.city}, ${b.state}.`,
 description:b.description??`${b.name} é um destino de praia em ${b.city}, ${b.state}. Consulte condições de banho, balneabilidade, acesso e orientações ambientais nos canais oficiais antes da visita. Cadastro geográfico e serviços locais aguardam validação.`,
 images:[image],coordinates:null,tags:["Praia",b.state,"Catálogo em expansão"],isDemo:true,...(b.sourceUrl ? {sourceUrl:b.sourceUrl} : {}),
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
 ] as string[][]).map(([id,name,city])=>make({id,name,city,state:"PA",region:"Norte",...(city==="Salinópolis"?{sourceUrl:"https://salinopolis.pa.gov.br/o-municipio/turismo-e-lazer/"}:{})})),

 // SANTA CATARINA — fontes oficiais de turismo e Programa Bandeira Azul
 ...([
 ["sc-florianopolis-daniela","Praia da Daniela","Florianópolis"],["sc-florianopolis-mocambique","Praia do Moçambique","Florianópolis"],["sc-florianopolis-acores","Praia dos Açores","Florianópolis"],["sc-florianopolis-joaquina","Praia da Joaquina","Florianópolis"],["sc-florianopolis-campeche","Praia do Campeche","Florianópolis"],["sc-florianopolis-mole","Praia Mole","Florianópolis"],["sc-florianopolis-jurere","Praia de Jurerê Internacional","Florianópolis"],["sc-florianopolis-ingleses","Praia dos Ingleses","Florianópolis"],["sc-florianopolis-canasvieiras","Praia de Canasvieiras","Florianópolis"],["sc-florianopolis-santinho","Praia do Santinho","Florianópolis"],["sc-florianopolis-barra-lagoa","Praia da Barra da Lagoa","Florianópolis"],["sc-bombinhas-conceicao","Praia da Conceição","Bombinhas"],["sc-bombinhas-quatro-ilhas","Praia de Quatro Ilhas","Bombinhas"],["sc-bombinhas-tainha","Praia da Tainha","Bombinhas"],["sc-bombinhas-mariscal","Praia de Mariscal","Bombinhas"],["sc-bc-estaleirinho","Praia do Estaleirinho","Balneário Camboriú"],["sc-bc-estaleiro","Praia do Estaleiro","Balneário Camboriú"],["sc-bc-taquaras","Praia de Taquaras","Balneário Camboriú"],["sc-itajai-cabecudas","Praia de Cabeçudas","Itajaí"],["sc-penha-armacao","Praia da Armação","Penha"],["sc-penha-alegre","Praia Alegre","Penha"],["sc-itapema-central","Praia Central","Itapema"],["sc-itapema-grossa","Praia Grossa","Itapema"],["sc-governador-grande","Praia Grande","Governador Celso Ramos"],
 ] as string[][]).map(([id,name,city])=>make({id,name,city,state:"SC",region:"Sul",sourceUrl:"https://www.setur.sc.gov.br/verao-em-santa-catarina-descubra-melhores-praias-para-aproveitar-com-a-familia/"})),


 // AMAZONAS — praias fluviais do Rio Negro e região metropolitana
 ...([
 ["am-manaus-ponta-negra","Praia da Ponta Negra","Manaus","https://www.manaus.am.gov.br/semcom/horarios-de-banho-na-praia-da-ponta-negra/"],["am-manaus-tupe","Praia do Tupé","Manaus","https://www.manaus.am.gov.br/semmas/wp-content/uploads/sites/26/2023/07/dom20082075-Regulamento-de-Uso-da-Praia.pdf"],["am-manaus-lua","Praia da Lua","Manaus","https://www.acamdaf.com.br/frame.php?DESTINO=Praia+da+Lua&ID_ARTIGO=264&pagina=eventos_detalhes.php"],["am-iranduba-acutuba","Praia de Açutuba","Iranduba","https://www.amazonastur.am.gov.br/"],["am-iranduba-japones","Praia do Japonês","Iranduba","https://www.amazonastur.am.gov.br/"],["am-iranduba-paricatuba","Praia de Paricatuba","Iranduba","https://www.amazonastur.am.gov.br/"],["am-manacapuru-miriti","Praia do Miriti","Manacapuru","https://www.amazonastur.am.gov.br/"],["am-manaus-dourada","Praia Dourada","Manaus","https://antigo.turismo.gov.br/sites/default/turismo/DPROD/PDITS/AMAZONAS/PDITS_MUNICIPIO_DE_MANAUS.pdf"],
 ] as string[][]).map(([id,name,city,sourceUrl])=>make({id,name,city,state:"AM",region:"Norte",sourceUrl})),


 // COMPLEMENTO NORDESTE — portais municipais/estaduais de turismo e órgãos ambientais
 ...([
 // Bahia — Prefeitura de Itacaré
 ["ba-itacare-concha","Praia da Concha","Itacaré","BA","https://itacare.ba.gov.br/praias/"],["ba-itacare-tiririca","Praia da Tiririca","Itacaré","BA","https://itacare.ba.gov.br/praias/"],["ba-itacare-costa","Praia da Costa","Itacaré","BA","https://itacare.ba.gov.br/praias/"],["ba-itacare-ribeira","Praia da Ribeira","Itacaré","BA","https://itacare.ba.gov.br/praias/"],["ba-itacare-pontal","Praia do Pontal","Itacaré","BA","https://itacare.ba.gov.br/praias/"],["ba-itacare-siriaco","Praia do Siriaco","Itacaré","BA","https://itacare.ba.gov.br/praias/"],["ba-itacare-prainha","Prainha","Itacaré","BA","https://itacare.ba.gov.br/praias/"],["ba-itacare-sao-jose","Praia de São José","Itacaré","BA","https://itacare.ba.gov.br/praias/"],
 // Alagoas — pontos monitorados pelo IMA/AL e turismo estadual
 ["al-maceio-pajucara","Praia de Pajuçara","Maceió","AL","https://www.ima.al.gov.br/"],["al-maceio-jatiuca","Praia de Jatiúca","Maceió","AL","https://www.ima.al.gov.br/"],["al-frances","Praia do Francês","Marechal Deodoro","AL","https://www.ima.al.gov.br/"],["al-gunga","Praia do Gunga","Roteiro","AL","https://www.ima.al.gov.br/"],["al-barra-sao-miguel","Praia de Barra de São Miguel","Barra de São Miguel","AL","https://www.ima.al.gov.br/"],
 // Pernambuco — praias conhecidas do litoral pernambucano
 ["pe-carneiros","Praia dos Carneiros","Tamandaré","PE","https://www.gov.br/turismo/pt-br/assuntos/noticias/ferias-escolares-no-nordeste-praias-cultura-e-historia-para-aproveitar-em-familia"],["pe-muro-alto","Praia de Muro Alto","Ipojuca","PE","https://www.gov.br/turismo/pt-br/assuntos/noticias/ferias-escolares-no-nordeste-praias-cultura-e-historia-para-aproveitar-em-familia"],["pe-maracaipe","Praia de Maracaípe","Ipojuca","PE","https://www.gov.br/turismo/pt-br/assuntos/noticias/ferias-escolares-no-nordeste-praias-cultura-e-historia-para-aproveitar-em-familia"],["pe-calhetas","Praia de Calhetas","Cabo de Santo Agostinho","PE","https://www.gov.br/turismo/pt-br/assuntos/noticias/ferias-escolares-no-nordeste-praias-cultura-e-historia-para-aproveitar-em-familia"],
 // Paraíba — Destino Paraíba e SUDEMA
 ["pb-cabo-branco","Praia de Cabo Branco","João Pessoa","PB","https://sudema.pb.gov.br/sudema-a-populacao/balneabilidade-das-praias"],["pb-bessa","Praia do Bessa","João Pessoa","PB","https://sudema.pb.gov.br/sudema-a-populacao/balneabilidade-das-praias"],["pb-manaira","Praia de Manaíra","João Pessoa","PB","https://sudema.pb.gov.br/sudema-a-populacao/balneabilidade-das-praias"],["pb-coqueirinho","Praia de Coqueirinho","Conde","PB","https://www.destinoparaiba.pb.gov.br/regiao/litoral-sul/"],["pb-tambaba","Praia de Tambaba","Conde","PB","https://www.destinoparaiba.pb.gov.br/regiao/litoral-sul/"],["pb-praia-bela","Praia Bela","Pitimbu","PB","https://sudema.pb.gov.br/sudema-a-populacao/balneabilidade-das-praias"],
 // Rio Grande do Norte — praias do litoral potiguar
 ["rn-genipabu","Praia de Genipabu","Extremoz","RN","https://www.visitnatal.br/conheca/praias"],["rn-pipa","Praia da Pipa","Tibau do Sul","RN","https://www.visitnatal.br/conheca/praias"],["rn-madeiro","Praia do Madeiro","Tibau do Sul","RN","https://www.visitnatal.br/conheca/praias"],["rn-amor","Praia do Amor","Tibau do Sul","RN","https://www.visitnatal.br/conheca/praias"],["rn-maracajau","Praia de Maracajaú","Maxaranguape","RN","https://www.visitnatal.br/conheca/praias"],
 // Ceará — principais praias do litoral cearense
 ["ce-cumbuco","Praia do Cumbuco","Caucaia","CE","https://www.ceara.gov.br/"],["ce-morro-branco","Praia de Morro Branco","Beberibe","CE","https://www.ceara.gov.br/"],["ce-fontes","Praia das Fontes","Beberibe","CE","https://www.ceara.gov.br/"],["ce-lagoinha","Praia da Lagoinha","Paraipaba","CE","https://www.ceara.gov.br/"],
 // Piauí — Prefeitura de Luís Correia e Secretaria Estadual de Turismo
 ["pi-luis-correia-itaqui","Praia do Itaqui","Luís Correia","PI","https://www.luiscorreia.pi.gov.br/turismo/"],["pi-luis-correia-arrombado","Praia do Arrombado","Luís Correia","PI","https://www.luiscorreia.pi.gov.br/turismo/"],["pi-luis-correia-macapa","Praia de Macapá","Luís Correia","PI","https://www.luiscorreia.pi.gov.br/turismo/"],["pi-pedra-sal","Praia da Pedra do Sal","Parnaíba","PI","https://turismo.pi.gov.br/ferias-conheca-os-destinos-turisticos-do-litoral-piauiense/"],
 // Maranhão — litoral da capital e Lençóis Maranhenses
 ["ma-sao-luis-calhau","Praia do Calhau","São Luís","MA","https://www.ma.gov.br/"],["ma-sao-luis-sao-marcos","Praia de São Marcos","São Luís","MA","https://www.ma.gov.br/"],["ma-atins","Praia de Atins","Barreirinhas","MA","https://www.gov.br/icmbio/pt-br/assuntos/unidade-de-conservacao/unidades-de-biomas/marinho/lista-de-ucs/parna-dos-lencois-maranhenses/paginas-site-parna-maranhenses-ma/orientacoes-ao-visitante"],
 // Sergipe — Turismo de Estância
 ["se-praia-saco","Praia do Saco","Estância","SE","https://turismo.estancia.se.gov.br/lugares/7/praia-do-saco"],["se-abais","Praia do Abaís","Estância","SE","https://turismo.estancia.se.gov.br/lugares/7/praia-do-saco"],["se-caueira","Praia da Caueira","Itaporanga d'Ajuda","SE","https://www.se.gov.br/"],
 ] as string[][]).map(([id,name,city,state,sourceUrl])=>make({id,name,city,state,region:"Nordeste",sourceUrl})),


 // AMAPÁ — balneário fluvial e litoral atlântico
 ...([
 ["ap-macapa-fazendinha","Balneário da Fazendinha","Macapá","https://macapa.ap.gov.br/turismo/balneario-da-fazendinha/"],["ap-calcoene-goiabal","Praia do Goiabal","Calçoene","https://turismoamapa.com.br/ap/calcoene/11/praia_do_goiabal"],
 ] as string[][]).map(([id,name,city,sourceUrl])=>make({id,name,city,state:"AP",region:"Norte",sourceUrl})),

];
