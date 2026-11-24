# CM Studio — HTML único

Todo o site está no **index.html**: Home, Coleções, estilos, animações, comportamento e configurações. As imagens ficam em **assets/images/**.

Na raiz do repositório ficam apenas:

- `README.md` — estas instruções.
- `index.html` — todo o código do site.
- `assets/` — imagens e marca.

## Como atualizar no GitHub

1. Extraia o ZIP e abra a pasta `cm-studio-html-unico`.
2. Envie o seu conteúdo para a **raiz do repositório**: `index.html`, `assets` e `README.md`. Não envie apenas o ZIP como um arquivo do repositório.
3. No GitHub, abra **Settings → Pages**.
4. Mantenha **Deploy from a branch**, escolha **main** e mude a pasta de **/docs** para **/(root)**. Salve.
5. Abra o endereço do site depois que o GitHub concluir a publicação.

A versão anterior usava `docs`, dois HTMLs e arquivos CSS/JS separados. Essa versão já não depende deles. Depois de verificar a nova publicação pela raiz, você pode remover do repositório os arquivos antigos desse pacote para evitar confusão. Preserve qualquer material seu que esteja fora dessa estrutura.

## Nosso fluxo de edição

Para mudar textos, layout, espaçamentos, configurações ou animações, envie o **index.html atualizado** aqui na conversa e descreva as mudanças. O ajuste será feito nesse arquivo e ele poderá substituir o anterior no GitHub. Só será necessário alterar a pasta `assets` quando houver inclusão, troca ou remoção de imagens.

Envie sempre o HTML que está em uso, principalmente se tiver feito alterações diretamente no GitHub. Isso evita substituir um ajuste seu por uma versão anterior.

## Onde editar dentro do HTML

Os blocos estão identificados por comentários que podem ser encontrados pela busca do editor:

| Bloco | Conteúdo |
| --- | --- |
| `01. ESTILOS` | CSS, cores, fontes, responsividade e animações |
| `02. CABEÇALHO` | Logo e menu |
| `03. ABERTURA` | Primeira seção da Home |
| `04. AMBIENTES` | Cards das quatro categorias |
| `05. METODOLOGIA` | Card principal, etapas, setas e descrições |
| `06. VÍDEOS` | Capas dos tours |
| `07. CONTATO` | Formulário |
| `08. FAQ` | Perguntas e respostas expansíveis |
| `09. COLEÇÕES` | Tela interna de escolha de modelos |
| `10. RODAPÉ` | Rodapé compartilhado |
| `11. CONFIGURAÇÕES` | WhatsApp, envio do formulário e URLs dos vídeos |
| `12. CATÁLOGO` | Textos, modelos e imagens das coleções |
| `13. INTERAÇÕES` | Navegação, galerias, formulário e efeitos |

## Navegação em um único arquivo

Home e Coleções mantêm telas distintas, mas agora usam rotas internas do mesmo HTML:

- `#home`
- `#sobre`
- `#contato`
- `#colecoes?ambiente=cozinhas`
- `#colecoes?ambiente=salas&modelo=rack&foto=2`

Os links das categorias, modelos, fotos e contato ficam no mesmo arquivo. Voltar/avançar do navegador e o acesso direto a essas rotas são tratados pelo próprio HTML. Os caminhos das imagens são relativos e funcionam em repositórios do GitHub Pages com ou sem domínio próprio.

## Integrações que continuam aguardando configuração

No bloco **11. CONFIGURAÇÕES**, preencha:

- `whatsapp`: número comercial com país e DDD, somente dígitos. O visitante continua no WhatsApp e envia a mensagem para concluir o contato.
- Ou `leadEndpoint`: URL HTTPS de um serviço que aceite POST JSON e CORS para o seu site. Se ambos estiverem preenchidos, o endpoint tem prioridade.
- `videos.apartamento`, `videos.comercial` e `videos.cozinha`: links HTTPS dos vídeos. YouTube, Vimeo e MP4 têm reprodução em modal.

Sem destino configurado, o formulário avisa que os dados não foram enviados. Sem link, o tour exibe a capa e informa que o vídeo será disponibilizado. Não há backend incluído; o GitHub Pages hospeda arquivos estáticos.

## Material e comportamento preservados

As 28 imagens e a marca de apoio da entrega anterior foram preservadas. Há três fotos para cada modelo de cozinha e sala. Dormitórios e Home Office continuam com a imagem disponível de cada categoria. A marca SVG foi reconstruída a partir da referência, como na primeira entrega; poderá ser substituída pelo arquivo original quando disponível.

As fontes Cormorant Garamond e Raleway continuam usando Google Fonts, com alternativas locais. As imagens estão no pacote; não foram embutidas em base64 para manter o HTML leve e fácil de enviar para ajustes.

**A animação de loading da logo não foi adicionada**, conforme solicitado.

## Verificação

O JavaScript incorporado, os caminhos das imagens, a estrutura do pacote e as rotas são conferidos por código. A revisão visual em navegador continua pendente, pois a prévia local está indisponível neste ambiente. Os destinos reais de contato e vídeo precisam ser testados depois de configurados.

Desenvolvimento: PROPACT MARKETING.
