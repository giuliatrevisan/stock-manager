## ⚙️ Configuração de ambiente

Antes de rodar o projeto, é necessário configurar as variáveis de ambiente.

---

### 📦 Frontend

1. Acesse a pasta `frontend`
2. Crie um arquivo `.env` (ou copie do exemplo)

```bash
cp .env.example .env
```

3. Configure a URL da API:

```env
# Rodando localmente
VITE_API_URL=http://localhost:3000

# Rodando com Docker (opcional)
# VITE_API_URL=http://backend:3000
```

---

### 🛠️ Backend

1. Acesse a pasta `backend`
2. Crie um arquivo `.env` (ou copie do exemplo)

```bash
cp .env.example .env
```

3. Configure as variáveis:

```env
# Rodando localmente (sem Docker)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stockdb"

# Rodando com Docker (opcional)
# DATABASE_URL="postgresql://postgres:postgres@postgres:5432/stockdb"

JWT_SECRET=supersecret
PORT=3000
```

---

## ▶️ Como rodar o projeto

### 🔹 Rodando localmente

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

### 🐳 Rodando com Docker

```bash
docker-compose up --build
```

---

## ⚠️ Observações importantes

* O frontend utiliza variáveis de ambiente do Vite, portanto:

  * Todas devem começar com `VITE_`
  * É necessário reiniciar o projeto após qualquer alteração no `.env`

* Se a variável `VITE_API_URL` não estiver configurada corretamente:

  * As requisições podem ser feitas para a porta do frontend (ex: `localhost:5173`)
  * Resultando em erro `404`

* Certifique-se de que o backend esteja rodando antes de acessar o frontend

---
