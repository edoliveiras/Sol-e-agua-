# SOL & ÁGUA BRASIL

Guia visual mobile-first de praias, cachoeiras, hotéis, pousadas e opções de day use no Brasil.

## O que já está implementado
- Navegação separada por praias, cachoeiras, hospedagem, mapa e favoritos.
- Busca por nome, cidade, estado, região, tags e comodidades.
- Filtros por categoria, estado e região.
- Fichas individuais com descrição, contatos e comodidades quando verificados.
- Créditos e links de licença para fotografias Creative Commons.
- Botão de rota e busca de localização no Google Maps.
- Previsão municipal de até três dias via Open-Meteo, sem chave de API.
- Avisos gerais de segurança para praias e cachoeiras.
- Testes de integridade do catálogo executados antes do build e publicação.

## Catálogo atual
22 registros iniciais:
- 5 praias
- 11 cachoeiras
- 1 hotel
- 3 pousadas
- 2 opções de day use

A cobertura inicial está concentrada em Minas Gerais, com alguns destinos conhecidos do Rio de Janeiro, Pernambuco e Bahia.

## Pendências conhecidas — não apresentar como concluído
- O catálogo ainda não cobre todos os destinos do Brasil; precisa de pesquisa e cadastro contínuos por estado e município.
- Várias fichas ainda não têm coordenadas verificadas, preço, horário, telefone ou condições de acesso confirmados.
- Algumas imagens continuam ilustrativas, especialmente em hotéis, pousadas, day use e parte dos atrativos naturais. As imagens externas licenciadas exibem autoria e licença.
- O mapa abre buscas e rotas no Google Maps; ainda não existe mapa interativo próprio com todos os pins e trilhas.
- Previsão do tempo é aproximada para o município quando não há coordenada exata do atrativo.
- Ondas, marés, balneabilidade e alertas locais em tempo real ainda não estão integrados.
- Avaliações, comentários, reservas e cadastro colaborativo de usuários ainda não estão implementados.
- O catálogo é estático no código; falta painel administrativo e banco de dados para cadastrar/atualizar destinos sem nova publicação.

## Desenvolvimento
```bash
bun install
bun run dev
bun run test
bun run build
```

## Publicação
O workflow em `.github/workflows/pages.yml` executa os testes, gera o build e publica o artefato no GitHub Pages.
