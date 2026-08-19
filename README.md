# Controle de Licitação

Sistema para controle e importação de dados de licitações públicas: cadastro de licitações, concorrentes, itens licitados e resultados (lances, valores orçados e economia gerada), com importação em lote a partir de relatórios.

## Stack

**Backend**
- Node.js + TypeScript
- Express 5
- Inversify (injeção de dependência)
- Firebird 5.0 (via `node-firebird`)
- Zod (validação de schemas)
- JWT + bcrypt (autenticação)
- Helmet, CORS, express-rate-limit, Morgan

**Frontend**
- React 17 + TypeScript
- Vite
- React Router DOM
- React Bootstrap
- Axios
- Tabulator (`react-tabulator`) para tabelas
- ApexCharts para gráficos
- SweetAlert2 (`react-bootstrap-sweetalert`) para alertas/modais

**Banco de dados**
- Firebird (`.fdb`)

## Estrutura do repositório

```
controle_de_licitacao/
├── backend/
│   ├── src/
│   │   ├── server.ts          # entrypoint: carrega env, conecta no banco, sobe o Express
│   │   ├── app.ts             # configuração do Express (middlewares e rotas)
│   │   ├── containers/        # configuração do Inversify (injeção de dependência)
│   │   ├── database/          # conexão com o Firebird
│   │   ├── routes/            # definição das rotas por recurso
│   │   ├── controllers/       # camada HTTP (recebe request, chama service)
│   │   ├── services/          # regras de negócio
│   │   ├── dao/                # acesso ao banco (queries)
│   │   ├── models/            # tipos/schemas dos dados
│   │   └── middlewares/       # ex.: errorHandler
│   ├── .env                   # variáveis de ambiente (não versionar)
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── public/
    │   └── config.json          # configuração de ambiente (URL da API por ambiente)
    ├── src/
    │   ├── main.tsx             # entrypoint do React
    │   ├── App.tsx              # componente raiz (providers, rotas, modais)
    │   ├── routes/              # definição das rotas do app
    │   ├── context/             # contexts (auth, modal, sweet alert, network status)
    │   ├── base/                # infraestrutura compartilhada (services, hooks, template)
    |   ├── daos/                # comunicação com a API
    |   ├── controllers/         # camada que recebe a requisição da API e decide o que deve acontecer
    │   └── view/                # telas e componentes de UI
    ├── package.json
    └── tsconfig.json
```

## Pré-requisitos

- Node.js 18+ (recomendado 20+)
- Servidor Firebird 5.0 acessível (local ou remoto) com um banco `.fdb` criado
- npm

## Configuração do banco

1. Crie o banco Firebird (`.fdb`) e rode o script presente em:  controle_de_licitacao\backend\src\database\scripts\script.sql
2. Garanta que as constraints `UNIQUE` abaixo existem, pois o backend depende delas para operações de upsert (`UPDATE OR INSERT ... MATCHING`) sem duplicação de dados:
   - `LICITACAO (PREGAO, PROCESSO_LICITATORIO, MUNICIPIO)`
   - `CONCORRENTE (CNPJ)`
   - `ITEM_LICITACAO (LICITACAO_ID, ITEM)`
   - `RESULTADO_LICITACAO (ITEM_LICITACAO_ID, CONCORRENTE_ID)`

## Configuração do backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na raiz de `backend/` com base no exemplo abaixo:

```dotenv
PORT=3000

VITE_API_URL=http://localhost:3000

FRONT_URL=http://localhost:5173

JWT_SECRET=uma_chave_muito_grande_e_aleatoria

NODE_ENV=development

DB_HOST=localhost
DB_PORT=3050
DB_DATABASE=path/to/database.fdb
DB_USER=your_user_here
DB_PASSWORD=your_password_here
```

| Variável | Descrição |
|---|---|
| `PORT` | Porta em que a API sobe |
| `FRONT_URL` | URL do frontend, usada na configuração de CORS |
| `JWT_SECRET` | Chave usada para assinar os tokens JWT |
| `NODE_ENV` | `development` ou `production` |
| `DB_HOST` / `DB_PORT` | Host e porta do servidor Firebird |
| `DB_DATABASE` | Caminho do arquivo `.fdb` no servidor Firebird |
| `DB_USER` / `DB_PASSWORD` | Credenciais de acesso ao banco |

### Rodando o backend

```bash
# ambiente de desenvolvimento (hot reload)
npm run dev

# build de produção
npm run build
npm start
```

A API sobe em `http://localhost:<PORT>` (padrão: `http://localhost:3000`).

## Configuração do frontend

```bash
cd frontend
npm install
```

Ajuste o `public/config.json` com a URL da API para cada ambiente (`producao`, `homologacao`, `desenvolvimento`) e defina o ambiente ativo em `ambiente` (1 = produção, 2 = homologação, 3 = desenvolvimento):

```json
{
   "ambiente": 3,
   "producao": {
      "WSCommandBaseUrl": "http://localhost:3000",
      "WSCommandTimeOut": 60000
   },
   "homologacao": {
      "WSCommandBaseUrl": "http://localhost:3000",
      "WSCommandTimeOut": 60000
   },
   "desenvolvimento": {
      "WSCommandBaseUrl": "http://localhost:3000",
      "WSCommandTimeOut": 60000
   }
}
```

### Rodando o frontend

```bash
npm run dev
```

A aplicação sobe via Vite em `http://localhost:5173` por padrão.

Para gerar o build de produção:

```bash
npm run build
npm run preview
```

## Funcionalidades

- Cadastro e consulta de **licitações**, **concorrentes** e **itens licitados**
- Registro de **resultados de licitação** (preço vencedor, valores orçados, economia percentual e em reais)
- **Importação em lote** de dados de licitação a partir de relatórios, com upsert atômico (evita duplicação de licitações, concorrentes, itens e resultados já existentes)
- Autenticação de usuários via JWT

## Licença

Projeto privado / uso interno.