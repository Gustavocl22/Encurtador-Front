# 🔗 Encurtador de URLs

🔗 Acesse o encurtador online: [https://encurtador-front-eta.vercel.app](https://encurtador-front-eta.vercel.app)

Este projeto é um **Encurtador de URLs** desenvolvido em React + Vite, com integração a uma API ASP.NET. Permite criar, visualizar, compartilhar e deletar links encurtados, além de acompanhar o número de cliques em cada link.

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

   ```


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

## 🚀 Como fazer o deploy no Vercel

Se preferir, você pode publicar seu encurtador gratuitamente no [Vercel](https://vercel.com/):

1. Crie uma conta em https://vercel.com/ (pode usar GitHub para login rápido).
2. Importe este repositório para o Vercel (botão "New Project").
3. Siga os passos na tela e clique em "Deploy".
4. Após alguns segundos, seu site estará disponível em uma URL do tipo `https://seu-projeto.vercel.app`.

> Não é necessário configurar nada extra para projetos React + Vite. O Vercel detecta automaticamente e faz o build.

---

## 📁 Estrutura dos arquivos principais

- `components/UrlShortener.tsx`: Componente principal do frontend, responsável por toda a lógica de encurtamento, listagem, deleção e compartilhamento de URLs.
- `components/UrlShortener.css`: Estilos personalizados do projeto.
- `.env.local`: Variáveis de ambiente sensíveis (não subir para o repositório público).
- `vite.config.js`: Configuração do Vite, incluindo o campo `base` para deploy.

---

Desenvolvido por [Gustavo Catucci](https://github.com/Gustavocl22)