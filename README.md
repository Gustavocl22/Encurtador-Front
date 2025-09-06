# 🔗 Encurtador de URLs

🔗 Acesse o encurtador online: [https://gustavocl22.github.io/Encurtador-Front/](https://gustavocl22.github.io/Encurtador-Front/)

Este projeto é um **Encurtador de URLs** desenvolvido em React + Vite, com integração a uma API ASP.NET protegida por API Key. Permite criar, visualizar, compartilhar e deletar links encurtados, além de acompanhar o número de cliques em cada link.

---

## ✨ Funcionalidades

- Encurtar URLs longas em links curtos e fáceis de compartilhar
- Visualizar todas as URLs encurtadas e seus cliques
- Compartilhar o link encurtado usando o menu nativo do navegador ou copiar para área de transferência
- Deletar URLs encurtadas
- Feedback visual para ações (sucesso, erro, copiado)

---

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [GitHub Pages](https://pages.github.com/) para deploy
- Backend em [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet) (não incluso neste repositório)

---

## 🖥️ Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Gustavocl22/Encurtador-Front.git
   cd Encurtador-Front
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:
   ```
   VITE_API_URL=https://encurtarurl.onrender.com/api/urlshortener
   VITE_X_API_KEY=sua-chave-aqui
   ```
   > Substitua `sua-chave-aqui` pela chave configurada no backend.

4. **Inicie o projeto:**
   ```bash
   npm run dev
   ```
   O app estará disponível em `http://localhost:5173`.

> **Atenção:** Para rodar localmente, o backend precisa liberar CORS para o endereço do frontend.

---

## 🚀 Como fazer o deploy no GitHub Pages

Siga este passo a passo para publicar seu próprio encurtador no GitHub Pages:

1. **Garanta que o campo `base` no `vite.config.js` está correto:**
   ```js
   base: '/Encurtador-Front/',
   ```
   > Troque pelo nome do seu repositório, se for diferente.

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

3. **Faça o build do projeto:**
   ```bash
   npm run build
   ```

4. **Faça o deploy para o GitHub Pages:**
   ```bash
   npm run deploy
   ```

5. **Acesse o site publicado:**
   O site ficará disponível em:
   ```
   https://<seu-usuario>.github.io/<nome-do-repositorio>/
   ```
   Exemplo: [https://gustavocl22.github.io/Encurtador-Front/](https://gustavocl22.github.io/Encurtador-Front/)

> **Importante:** O backend deve liberar CORS para o domínio do GitHub Pages.

---

## 📁 Estrutura dos arquivos principais

- `components/UrlShortener.tsx`: Componente principal do frontend, responsável por toda a lógica de encurtamento, listagem, deleção e compartilhamento de URLs.
- `components/UrlShortener.css`: Estilos personalizados do projeto.
- `.env.local`: Variáveis de ambiente sensíveis (não subir para o repositório público).
- `vite.config.js`: Configuração do Vite, incluindo o campo `base` para deploy.

---

## 🔒 Segurança

- Todas as requisições para a API são autenticadas via header `X-API-KEY`.
- A chave da API é lida das variáveis de ambiente do Vite.
- O backend ASP.NET valida a chave em todas as rotas protegidas.

---


Desenvolvido por [Gustavo Catucci](https://github.com/Gustavocl22)