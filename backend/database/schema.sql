
CREATE TYPE role_usuario AS ENUM ('cliente', 'atendente');
CREATE TYPE prioridade_chamado AS ENUM ('baixa', 'media', 'alta');
CREATE TYPE status_chamado AS ENUM ('aberto', 'em_andamento', 'fechado');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    role role_usuario NOT NULL
);

CREATE TABLE chamados (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(50),
    prioridade prioridade_chamado NOT NULL DEFAULT 'media',
    status status_chamado NOT NULL DEFAULT 'aberto',
    cliente_id INTEGER NOT NULL REFERENCES usuarios(id),
    atendente_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);