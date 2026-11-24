# CM Studio — primeira versão

Site estático, com Home e Coleções, preparado para GitHub Pages. Não exige instalação, compilação, WordPress ou servidor Node em produção.

## Publicar pelo GitHub

1. Extraia o ZIP. Envie **o conteúdo da pasta `cm-studio-github`** para o repositório, mantendo a pasta `docs` e toda a estrutura de `assets`.
2. Abra **Settings → Pages** no repositório.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch **main** e a pasta **/docs**. Clique em **Save**.
5. Aguarde a publicação e abra o endereço exibido pelo GitHub.

Os caminhos são relativos e funcionam tanto em domínio próprio quanto em `usuario.github.io/repositorio/`. Não é necessário informar o nome do repositório no código. A pasta `docs` também pode ser copiada para qualquer hospedagem estática.

## Arquivos

| Caminho | Conteúdo |
| --- | --- |
| `docs/index.html` | Home: abertura, ambientes, metodologia, tours, formulário e FAQ |
| `docs/colecoes.html` | Categorias, modelos e galerias |
| `docs/assets/css/style.css` | Layout responsivo e animações |
| `docs/assets/js/app.js` | Navegação, revelação de texto, galerias, formulário e vídeos |
| `docs/assets/js/catalogo.js` | Textos e modelos das coleções |
| `docs/assets/js/config.js` | Destino do contato e links de vídeos |
| `docs/assets/images/` | 28 imagens e marca vetorial de apoio |
| `mapa-dos-arquivos.json` | Correspondência entre os nomes originais e os nomes publicados |
| `referencias/` | Referências de desktop e celular preservadas, fora do site publicado |

## O que está implementado

- Home e página de Coleções com quatro categorias navegáveis.
- Cozinhas: Linear, Em L e Com Ilha; três imagens em cada modelo.
- Salas: Painel com Nichos, Rack Suspenso e Parede Completa; três imagens em cada modelo.
- Dormitórios e Home Office usam a imagem disponível de cada categoria. Não foram inventados outros projetos.
- Troca de fotos por pontos, botões, teclado e gesto lateral no celular. Sem rotação automática que atrapalhe a escolha.
- URLs mantêm ambiente, modelo e foto. Voltar/avançar do navegador restaura a escolha.
- O botão “Quero esse modelo” leva ao formulário com o interesse preenchido.
- Textos surgem de baixo para cima dentro de máscaras, com desfoque breve. Cards entram com escala e blur em sequência.
- Na metodologia, a caixa entra antes das quatro etapas. Cada etapa expande ao clicar na seta.
- FAQ com “+” que vira “−” ao abrir. Conteúdo também funciona sem JavaScript.
- Menu mobile, rodapé com mármore e marca, foco visível e respeito a movimento reduzido.
- Imagens maiores convertidas para JPEG; fundos e cards transparentes preservados em PNG. Imagens abaixo da abertura usam carregamento sob demanda.

## Configuração necessária para produção

O layout está implementado, mas as integrações abaixo dependem de dados que não estavam no material. **Não existe confirmação fictícia de envio ou reprodução.**

### Contato

Edite `docs/assets/js/config.js` e preencha uma das opções:

- `whatsapp`: número comercial com país e DDD, apenas dígitos. O formulário abrirá uma mensagem preenchida; o visitante deve enviá-la no WhatsApp para concluir o contato.
- `leadEndpoint`: URL HTTPS de um serviço de formulário que aceite POST JSON e CORS para o domínio do site. Tem preferência sobre o WhatsApp se ambos estiverem configurados. O site só confirma o recebimento após resposta HTTP bem-sucedida.

Sem essas opções, o formulário informa claramente que o envio está em configuração. Ele não armazena dados pessoais no navegador nem envia para terceiros. GitHub Pages, sozinho, não processa formulários.

### Vídeos

As três capas estão incluídas. Preencha `videos.apartamento`, `videos.comercial` e `videos.cozinha` em `config.js` com as URLs dos vídeos. YouTube, Vimeo e MP4 HTTPS têm reprodução em modal. Outros links HTTPS abrem em nova aba. Sem URL, a capa abre com aviso de vídeo em breve.

### Marca e textura

O arquivo vetorial de apoio `logo.svg` foi reconstruído a partir da marca visível nas referências; não é o arquivo original da identidade. Pode ser substituído mantendo o mesmo nome. A textura usa o mármore creme encontrado junto aos materiais, clareado por sobreposição CSS para aproximar o fundo das referências.

### Textos

As descrições expandidas de metodologia e as respostas do FAQ são uma primeira redação para revisão. Não foram criados prazos, garantias ou regiões de atendimento sem confirmação. Ajuste esses textos em `index.html` quando houver definições comerciais.

## Fontes

Cormorant Garamond e Raleway são carregadas pelo Google Fonts. Há alternativas locais de serifada e sans-serif caso o serviço esteja indisponível. As imagens e o código do site estão no pacote.

## Pré-visualização

Abra `docs/index.html` no navegador ou use a extensão Live Server no editor. A navegação funciona sem build. O formulário integrado deve ser validado após configurar o destino real; os vídeos devem ser conferidos após cadastrar suas URLs.

Desenvolvimento: PROPACT MARKETING.
