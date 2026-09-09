# Backend — Sistema de Abertura de Chamados

API REST em Node.js (Express) + PostgreSQL, com autenticação JWT.

## Stack

- Node.js + Express
- PostgreSQL (via `pg`)
- Autenticação: JWT (`jsonwebtoken`) + hash de senha (`bcrypt`)
- ES Modules (`import`/`export`)

## Setup

1. Instale as dependências:

npm install


2. Crie o banco de dados e rode o schema:

createdb sistema_chamados
psql -U postgres -d sistema_chamados -f database/schema.sql


3. Crie um arquivo `.env` na raiz do backend com:

DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_NAME=sistema_chamados
DB_PORT=5432

JWT_SECRET=uma_chave_aleatoria_grande
PORT=3000


4. Rode o servidor em modo desenvolvimento:

npm run dev


## Rotas disponíveis

### Autenticação

| Método | Rota | Descrição | Protegida? |
|---|---|---|---|
| POST | `/auth/register` | Cria um novo usuário (nome, email, senha, role) | Não |
| POST | `/auth/login` | Autentica e retorna um JWT | Não |

### Chamados

🚧 Em desenvolvimento

## Autenticação nas rotas protegidas

Envie o token recebido no login no header:

Authorization: Bearer <token>


## Estrutura de pastas

src/
config/ → conexão com o banco (db.js)
models/ → queries SQL, uma função por operação
controllers/ → lógica de negócio e resposta HTTP
middlewares/ → autenticação (authMiddleware.js)
routes/ → definição das rotas
server.js → ponto de entrada
