# Gerenciador de Livros

Aplicação simples para gerenciamento de livros, desenvolvida como desafio técnico full stack.

O projeto permite cadastrar, listar, excluir, buscar por título e ordenar livros por ano. A persistência é feita em memória no backend, conforme o escopo do desafio.

## Tecnologias

### Backend
- Node.js
- TypeScript
- Express

### Frontend
- React
- TypeScript
- Vite

## Funcionalidades
- Cadastro de livros
- Listagem de livros
- Exclusão de livros com confirmação
- Busca por título
- Ordenação por ano crescente e decrescente
- Estado de carregamento
- Estado vazio
- Tratamento de erros da API
- Layout responsivo

## Como rodar o backend

Acesse a pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Rode em modo desenvolvimento:

```bash
npm run dev
```

O backend ficará disponível em:

```txt
http://localhost:3333
```

## Como rodar o frontend

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Conteúdo esperado:

```env
VITE_API_BASE_URL=http://localhost:3333
```

Rode em modo desenvolvimento:

```bash
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

## Possíveis melhorias futuras

- Persistir dados em banco de dados.
- Adicionar testes automatizados.
- Adicionar edição de livros.
- Paginar a listagem de livros.
- Melhorar mensagens de erro retornadas pelo frontend com base na resposta da API.
