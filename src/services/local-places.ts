import type { Destination } from "@/types/destination";

export type LivePlaceGroup = "hospedagem" | "gastronomia" | "lazer";
export interface LiveFoodPlace {
  id: string; name: string; type: string; address: string; distanceKm: number;
  openingHours?: string; priceRange?: string; rating?: string; website?: string;
  instagram?: string; whatsapp?: string; mapUrl: string;
}

const states: Record<string,string> = {AC:"Acre",AL:"Alagoas",AP:"Amapá",AM:"Amazonas",BA:"Bahia",CE:"Ceará",DF:"Distrito Federal",ES:"Espírito Santo",GO:"Goiás",MA:"Maranhão",MT:"Mato Grosso",MS:"Mato Grosso do Sul",MG:"Minas Gerais",PA:"Pará",PB:"Paraíba",PR:"Paraná",PE:"Pernambuco",PI:"Piauí",RJ:"Rio de Janeiro",RN:"Rio Grande do Norte",RS:"Rio Grande do Sul",RO:"Rondônia",RR:"Roraima",SC:"Santa Catarina",SP:"São Paulo",SE:"Sergipe",TO:"Tocantins"};
const distance=(a:[number,number],b:[number,number])=>{const rad=(v:number)=>v*Math.PI/180;const x=Math.sin(rad(b[0]-a[0])/2)**2+Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(rad(b[1]-a[1])/2)**2;return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));};

async function getCoordinates(destination:Destination):Promise<[number,number]|null>{
  if(destination.coordinates?.verified)return [destination.coordinates.lat,destination.coordinates.lng];
  const state=states[destination.state]??destination.state;
  for(const name of [destination.name,destination.city]){
    const url="https://geocoding-api.open-meteo.com/v1/search?name="+encodeURIComponent(name+" "+state+" Brasil")+"&count=20&language=pt&format=json";
    const response=await fetch(url);if(!response.ok)continue;
    const results=(await response.json()).results??[];
    const match=results.find((item:any)=>item.country_code==="BR"&&item.admin1?.toLowerCase().includes(state.toLowerCase()));
    if(match)return [match.latitude,match.longitude];
  }
  return null;
}

const filters:Record<LivePlaceGroup,string>={
 hospedagem:'["tourism"~"^(hotel|motel|guest_house|hostel|apartment|resort|camp_site|caravan_site|chalet)$"]',
 gastronomia:'["amenity"~"^(restaurant|bar|pub|cafe|fast_food|ice_cream)$"]',
 lazer:'["tourism"~"^(attraction|museum|gallery|viewpoint|theme_park)$"],["historic"],["leisure"~"^(water_park|sports_centre|marina|fitness_centre)$"],["amenity"~"^(nightclub|arts_centre|community_centre|theatre|events_venue)$"]'
};
function kind(tags:any,group:LivePlaceGroup):string{
 if(group==="hospedagem")return ({hotel:"Hotel",motel:"Motel",guest_house:"Pousada / hospedaria",hostel:"Hostel",apartment:"Apartamento para temporada",resort:"Resort",camp_site:"Camping",caravan_site:"Camping para veículos",chalet:"Chalé"} as Record<string,string>)[tags.tourism]??"Hospedagem";
 if(group==="gastronomia")return String(tags.cuisine??"").toLowerCase().includes("pizza")?"Pizzaria":tags.amenity==="ice_cream"?"Sorveteria":tags.amenity==="fast_food"?"Lanchonete":tags.amenity==="restaurant"?"Restaurante":tags.amenity==="bar"||tags.amenity==="pub"?"Bar / quiosque": "Café";
 return tags.amenity==="nightclub"?"Casa noturna":tags.amenity==="theatre"?"Teatro":tags.amenity==="arts_centre"?"Centro cultural":tags.amenity==="events_venue"?"Espaço de eventos":tags.amenity==="community_centre"?"Centro comunitário":tags.tourism==="museum"?"Museu":tags.tourism==="gallery"?"Galeria":tags.historic?"Ponto histórico":tags.leisure==="marina"?"Marina / passeio náutico":tags.leisure==="sports_centre"?"Centro esportivo":"Atrativo / passeio";
}

export async function getLiveNearbyPlaces(destination:Destination,group:LivePlaceGroup):Promise<LiveFoodPlace[]>{
 const point=await getCoordinates(destination);if(!point)return [];
 const [lat,lon]=point;
 const selectors=filters[group].split(",").map(s=>s.trim()).filter(Boolean);
 const clauses=selectors.flatMap(selector=>["node","way","relation"].map(type=>type+selector+"(around:25000,"+lat+","+lon+");")).join("");
 const query="[out:json][timeout:25];("+clauses+");out center tags;";
 const response=await fetch("https://overpass-api.de/api/interpreter",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:"data="+encodeURIComponent(query)});
 if(!response.ok)throw new Error("Busca de locais próximos indisponível");
 const json=await response.json();
 const seen=new Set<string>();
 return (json.elements??[]).flatMap((item:any)=>{
  const tags=item.tags??{};if(!tags.name)return [];
  const pLat=item.lat??item.center?.lat,pLon=item.lon??item.center?.lon;
  if(typeof pLat!=="number"||typeof pLon!=="number")return [];
  const id=String(item.type)+"/"+String(item.id);if(seen.has(id))return [];seen.add(id);
  const street=[tags["addr:street"],tags["addr:housenumber"]].filter(Boolean).join(", ");
  const address=[street,tags["addr:suburb"],tags["addr:city"],tags["addr:state"]].filter(Boolean).join(" · ")||"Endereço não cadastrado";
  return [{id,name:tags.name,type:kind(tags,group),address,distanceKm:distance(point,[pLat,pLon]),openingHours:tags.opening_hours,priceRange:tags["price_range"]??tags["price:range"],rating:tags.stars,website:tags["contact:website"]??tags.website,instagram:tags["contact:instagram"]??tags.instagram,whatsapp:tags["contact:whatsapp"]??tags.whatsapp??tags["contact:phone"]??tags.phone,mapUrl:"https://www.openstreetmap.org/"+item.type+"/"+item.id}];
 }).sort((a:LiveFoodPlace,b:LiveFoodPlace)=>a.distanceKm-b.distanceKm).slice(0,40);
}

export async function getLiveFoodPlaces(destination:Destination):Promise<LiveFoodPlace[]>{return getLiveNearbyPlaces(destination,"gastronomia");}
