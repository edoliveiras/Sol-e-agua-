import type { Destination } from "@/types/destination";

export interface LiveFoodPlace {
  id: string;
  name: string;
  type: string;
  address: string;
  distanceKm: number;
  openingHours?: string;
  priceRange?: string;
  rating?: string;
  website?: string;
  instagram?: string;
  whatsapp?: string;
  mapUrl: string;
}

const states: Record<string, string> = {
  AC:"Acre",AL:"Alagoas",AP:"Amapá",AM:"Amazonas",BA:"Bahia",CE:"Ceará",DF:"Distrito Federal",ES:"Espírito Santo",GO:"Goiás",MA:"Maranhão",MT:"Mato Grosso",MS:"Mato Grosso do Sul",MG:"Minas Gerais",PA:"Pará",PB:"Paraíba",PR:"Paraná",PE:"Pernambuco",PI:"Piauí",RJ:"Rio de Janeiro",RN:"Rio Grande do Norte",RS:"Rio Grande do Sul",RO:"Rondônia",RR:"Roraima",SC:"Santa Catarina",SP:"São Paulo",SE:"Sergipe",TO:"Tocantins",
};
const normalize = (v: string) => v.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLowerCase();
const distance = (a: [number,number], b: [number,number]) => {
  const rad = (v:number) => v * Math.PI / 180;
  const dLat=rad(b[0]-a[0]), dLon=rad(b[1]-a[1]);
  const x=Math.sin(dLat/2)**2+Math.cos(rad(a[0]))*Math.cos(rad(b[0]))*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
};

export async function getLiveFoodPlaces(destination: Destination): Promise<LiveFoodPlace[]> {
  let lat = destination.coordinates?.verified ? destination.coordinates.lat : null;
  let lon = destination.coordinates?.verified ? destination.coordinates.lng : null;
  if (lat === null || lon === null) {
    const stateName = states[destination.state] ?? destination.state;
    const queries = [destination.name, destination.city].filter((value,index,all)=>all.indexOf(value)===index);
    let match: any = null;
    for (const placeName of queries) {
      const query = placeName + " " + stateName + " Brasil";
      const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(query) + "&count=20&language=pt&format=json");
      if (!response.ok) continue;
      const json = await response.json();
      const results = json.results ?? [];
      match = results.find((item:any) => item.country_code === "BR" && item.admin1?.toLowerCase().includes(stateName.toLowerCase()))
        ?? null;
      if (match) break;
    }
    if (!match) return [];
    lat=match.latitude; lon=match.longitude;
  }

  const query = '[out:json][timeout:20];(node["amenity"~"^(restaurant|bar|pub|cafe|fast_food)$"](around:20000,'+lat+','+lon+');way["amenity"~"^(restaurant|bar|pub|cafe|fast_food)$"](around:20000,'+lat+','+lon+');relation["amenity"~"^(restaurant|bar|pub|cafe|fast_food)$"](around:20000,'+lat+','+lon+'););out center tags;';
  const response = await fetch("https://overpass-api.de/api/interpreter", {method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:"data="+encodeURIComponent(query)});
  if (!response.ok) throw new Error("Pesquisa de estabelecimentos indisponível");
  const json = await response.json();
  return (json.elements ?? []).flatMap((item:any) => {
    const tags=item.tags ?? {};
    if (!tags.name) return [];
    const pLat=item.lat ?? item.center?.lat, pLon=item.lon ?? item.center?.lon;
    if (typeof pLat !== "number" || typeof pLon !== "number") return [];
    const kind=String(tags.cuisine ?? "").toLowerCase().includes("pizza") ? "Pizzaria" : tags.amenity==="fast_food" ? "Lanchonete / alimentação rápida" : tags.amenity==="restaurant" ? "Restaurante" : tags.amenity==="bar" || tags.amenity==="pub" ? "Bar" : "Café";
    const street=[tags["addr:street"],tags["addr:housenumber"]].filter(Boolean).join(", ");
    const address=[street,tags["addr:suburb"],tags["addr:city"] ?? destination.city,tags["addr:state"] ?? destination.state].filter(Boolean).join(" · ");
    const phone=tags["contact:whatsapp"] ?? tags.whatsapp ?? tags["contact:phone"] ?? tags.phone;
    const website=tags["contact:website"] ?? tags.website;
    const instagram=tags["contact:instagram"] ?? tags.instagram;
    const dist=distance([lat,lon],[pLat,pLon]);
    return [{id:String(item.type)+"/"+String(item.id),name:tags.name,type:kind,address:address || "Endereço não cadastrado",distanceKm:dist,openingHours:tags.opening_hours,priceRange:tags["price_range"] ?? tags["price:range"],rating:tags.stars,website,instagram,whatsapp:phone,mapUrl:"https://www.openstreetmap.org/"+item.type+"/"+item.id}];
  }).sort((a:LiveFoodPlace,b:LiveFoodPlace)=>a.distanceKm-b.distanceKm).slice(0,30);
}
