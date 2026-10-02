# PLACEHOLDERS — o que trocar quando a Gracy responder

Tudo que está marcado como `TODO` no código, reunido aqui. Nada publicado deve ir ao ar com estes itens pendentes.

## 1. Logo oficial da PowerRH
- **Arquivos:** `index.html`, `a-powerrh.html`, `solucoes.html`, `diagnostico.html` — buscar por `<!-- TODO: substituir wordmark`
- **O que fazer:** trocar o wordmark tipográfico "PowerRH" (navbar + rodapé de cada página) pelo SVG/PNG oficial. Salvar o arquivo em `assets/` (ex.: `assets/logo-powerrh.svg`).
- **Favicon:** cada página referencia `assets/foto-placeholder.svg` como favicon temporário — trocar pelo favicon oficial.

## 2. Foto da Gracy (retrato profissional)
- **Arquivo:** `index.html` — seção Hero, buscar por `<!-- TODO: foto real da Gracy`
- **Arquivo:** `a-powerrh.html` — seção Liderança, buscar por `<!-- TODO: foto retrato profissional`
- **O que fazer:** salvar em `assets/` (ex.: `assets/graciete-retrato.jpg`, alta resolução, ambiente corporativo) e trocar o `src` do `assets/foto-placeholder.svg`. Manter o `alt` descritivo e o `aspect-ratio` da classe.

## 3. Foto institucional (ambiente corporativo sóbrio)
- **Arquivo:** `index.html` — seção "O papel do Advisor", buscar por `<!-- TODO: foto institucional`
- **O que fazer:** salvar em `assets/` (ex.: `assets/escritorio.jpg`) e trocar o `src`. Regra da cliente: ambiente real e sóbrio, nada de banco de imagem com sorriso artificial.

## 4. WhatsApp comercial
- **Arquivo:** `js/main.js` — topo do arquivo, `CONFIG.whatsapp` (só dígitos, com DDI+DDD, ex.: `"5591984376712"`)
- **Reflete em:** botão "Chamar no WhatsApp" (`diagnostico.html`) e links do rodapé (4 páginas) — todos usam `data-config-whatsapp` e são preenchidos automaticamente pelo JS. Os `<!-- TODO: número do WhatsApp -->` no HTML podem ser removidos depois.

## 5. E-mail que recebe os contatos
- **Arquivo:** `js/main.js` — `CONFIG.email` (ex.: `"contato@powerrh.com.br"`)
- **Reflete em:** links do rodapé (4 páginas) via `data-config-email`.

## 6. Domínio
- **Arquivo:** `js/main.js` — `CONFIG.domain` (ex.: `"https://www.powerrh.com.br"`)
- **Usar em:** `og:image` das 4 páginas (há `<!-- TODO: og:image -->` no `<head>` de cada uma) — a URL precisa ser absoluta.

## 7. Destino do formulário (envio real)
- **Arquivo:** `js/main.js` — `CONFIG.formEndpoint`
- **O que fazer:** apontar para o serviço de envio (ex.: FormSubmit `https://formsubmit.co/ajax/SEU-EMAIL`). Enquanto vazio, o formulário **simula** o envio localmente (modo demonstração) — não usar em produção.

## 8. Depoimentos do LinkedIn
- **Arquivo:** `index.html` — seção "Quem já trabalhou com a Gracy", buscar por `<!-- TODO: depoimentos`
- **O que fazer:** confirmar com a Gracy quais dos 4 depoimentos podem ir ao ar (ela precisa autorizar nome + cargo). Sem autorização documentada, remover o bloco correspondente.

## 9. Decisões de copy pendentes (não bloqueiam o layout)
- Manter "escravo da operação?" ou suavizar (pergunta 11 do briefing).
- Termo único: advisor / assessora / conselheira (pergunta 12).
- Posicionamento "empresas familiares do Norte" (pergunta 13).
- Nome do método Advisory (pergunta 14).

## 10. Pós-lançamento (fora deste escopo)
- Política de privacidade + retenção de dados (LGPD).
- Roteiro de pós-envio do formulário (quem retorna, quando, por onde).
- Fotos finais aprovadas pela Gracy antes de publicar.
