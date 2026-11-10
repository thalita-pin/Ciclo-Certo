# Ciclo Certo — Site educativo sobre lixo eletrônico

Site estático criado para o projeto de extensão **Meio Ambiente e Saúde** de Análise e Desenvolvimento de Sistemas (ADS), destinado à comunidade escolar do Colégio Estadual Professora Dirce Celestino do Amaral (CIC, Curitiba/PR).

## O que o site oferece

- Conteúdo educativo com dados internacionais sobre geração, coleta e reciclagem de lixo eletrônico e impactos à saúde e ao meio ambiente;
- Categorias ilustradas de eletrônicos (celulares, computadores, cabos e pilhas);
- **Guia interativo de descarte**: escolha o material e marque se está sem uso ou danificado; a orientação muda conforme a escolha;
- **Onde levar**: links atualizados diretamente nos canais da Prefeitura de Curitiba, ABREE e Green Eletron (sem reproduzir endereços que podem mudar);
- **Lista de atitudes** com progresso e salvamento opcional neste próprio navegador;
- **Quiz com oito perguntas**, correção, explicações, pontuação, opção para refazer e baixar resultado em `.txt`;
- Perguntas frequentes, referências, aumento/diminuição de letras, contraste, menu responsivo e **botão voltar ao topo**.

O site não recolhe CPF, nomes, respostas ou formulários. As respostas do quiz são calculadas localmente e não são enviadas. Algumas preferências são armazenadas no `localStorage` do navegador do visitante. **Não há contador de visitas nem banco de dados**, portanto não atribua ao site números de acessos sem adicionar uma forma legítima de mensuração.

## Arquivos

```
index.html                  Estrutura e textos do site
styles.css                  Todas as cores e estilos (variáveis CSS no início)
script.js                   Guia, quiz, acessibilidade, menu e demais interações
assets/favicon.svg          Ícone da aba
assets/imagens/*.svg        Logo e ilustrações editáveis separadamente
README.md                   Este arquivo
```

Tudo funciona em HTML/CSS/JavaScript puro, sem instalações, frameworks ou bibliotecas externas.

## Como abrir no computador

1. Extraia o ZIP para uma pasta.
2. Dê dois cliques em `index.html` para abrir no navegador.
3. Navegue pelas seções e teste a lista e o quiz. Internet só é necessária para visitar os links externos.

## Paleta visual

O design foi atualizado para as cinco cores da paleta enviada. Botões principais usam coral com texto escuro; cartões e selos usam verde ou dourado; componentes interativos usam turquesa; ciano neon aparece pontualmente sobre fundos escuros. Os ícones SVG também foram recoloridos mantendo os arquivos individuais editáveis. O botão **Voltar ao topo** tem hover coral com texto escuro para não desaparecer no fundo.

## Como editar

- **Cores e espaçamentos:** início de `styles.css`, no seletor `:root`. Paleta atual (Coolors, arquivo `palette (6).scss`): Coral Glow `#FF8360`, Light Gold `#E8E288`, Moss Green `#7DCE82`, Turquoise `#3CDBD3` e Neon Ice `#00FFF5`. Tons de apoio para leitura: verde-escuro `#173F32` e fundo claro `#F7FBF5`. Todas as variáveis ficam no início de `styles.css`.
- **Textos e links de fontes/pontos de coleta:** `index.html`.
- **Perguntas e respostas do quiz:** array `QUESTIONS` no final de `script.js` (cada questão tem `question`, três `options`, índice numérico `correct` começando em 0 e `explanation`).
- **Instruções do guia:** objeto `DEVICE_GUIDE` em `script.js`.
- **Ilustrações:** pasta `assets/imagens`; SVG pode ser editado como texto, no Inkscape, Illustrator ou em outro editor compatível.

Quando alterar nomes ou endereços de coleta, **verifique diretamente o canal oficial** para não divulgar informações desatualizadas.

## Como publicar gratuitamente no GitHub Pages

1. Crie um **repositório público** na conta GitHub (por exemplo, `Ciclo-Certo`).
2. Envie `index.html`, `styles.css`, `script.js`, `README.md` e a pasta `assets` para a **raiz** do repositório. Não envie apenas o ZIP.
3. Em **Settings → Pages**, escolha **Deploy from a branch**, selecione a branch principal e a pasta `/ (root)`, e salve.
4. Aguarde o GitHub disponibilizar o link, geralmente no formato `https://SEU-USUARIO.github.io/Ciclo-Certo/`.
5. Abra o link no celular e teste os botões e o quiz. Gere no Canva um QR Code para **esse endereço publicado**, não para o arquivo local do seu computador.

## Limites e cuidados da intervenção

- O site é **educativo** e não é um ponto de recebimento, uma ferramenta de agendamento nem representa Prefeitura/ABREE/Green Eletron.
- A lista de atitudes é pessoal. Não registra quantos estudantes participaram.
- O quiz gera apenas uma pontuação local; o texto baixado não comprova presença.
- Para o relatório da DreamShaper, documente separadamente a divulgação, a atividade e a avaliação de aprendizagem, com autorização da escola e sem identificar estudantes.
- Não incentive que alunos abram baterias, desmontem aparelhos ou manuseiem itens danificados.

## Fontes institucionais

- [UIT/UNITAR — Global E-waste Monitor 2024](https://www.itu.int/en/ITU-D/Environment/Pages/Publications/The-Global-E-waste-Monitor-2024.aspx) — estatísticas globais de 2022.
- [Organização Mundial da Saúde — relatório em português](https://www.who.int/pt/publications/i/item/9789240023901) — exposição ao lixo eletrônico e saúde infantil.
- [Prefeitura de Curitiba — Lixo Eletroeletrônico](https://coletalixo.curitiba.pr.gov.br/lixo-eletroeletronico).
- [ABREE](https://abree.org.br/) — ferramenta para consultar pontos de recebimento por CEP/produto.
- [Green Eletron — Onde descartar](https://greeneletron.org.br/onde-descartar/).
- [ONU Brasil — Agenda 2030](https://brasil.un.org/pt-br/91863-agenda-2030-para-o-desenvolvimento-sustent%C3%A1vel).

**Conteúdo revisado em novembro de 2026.** Consulte periodicamente os links e informações antes de reutilizar o material.
