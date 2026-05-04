# 📦 Stock Manager - Giulia Trevisan

Sistema completo de gestão de estoque desenvolvido como teste técnico, com foco em boas práticas de engenharia de software, arquitetura moderna, performance e organização de código.

---

## 🚀 Visão geral

A aplicação simula um ambiente real de controle de estoque, incluindo:

- CRUD completo de produtos
- Controle de estoque com regras de negócio
- Gestão de usuários com perfis (admin/user)
- Dashboard com indicadores e gráficos
- Sistema de autenticação JWT
- Paginação e filtros
- Exportação de relatórios (Excel e PDF)
- Ambiente totalmente dockerizado

---

## 🧱 Tecnologias utilizadas

### Frontend
- React 19 + TypeScript
- Vite
- Material UI + TailwindCSS
- Framer Motion
- Recharts
- Axios
- React Router DOM
- Context API

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs
- Zod
- Swagger

### Infraestrutura
- Docker
- Docker Compose

---

## 📂 Estrutura do projeto
```
stock-manager/
├── backend/
├── frontend/
├── docker-compose.yml
├── README.md
└── Documentação - Giulia Trevisan.pdf
```

⚙️ Execução do projeto
▶️ Com Docker (recomendado)
```bash
docker compose up --build
```
Após subir o projeto:
Frontend: http://localhost:5173
Backend: http://localhost:3000
Swagger: http://localhost:3000/docs
---
👤 Usuário padrão (seed)
Email: admin@system.com
Senha: 123456
---
🔐 Variáveis de ambiente
Backend (.env)
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stockdb"
JWT_SECRET=supersecret
PORT=3000

ADMIN_EMAIL=admin@system.com
ADMIN_PASSWORD=123456
ADMIN_NAME="Administrador do Sistema"
```
Frontend (.env)
```
VITE_API_URL=http://backend:3000
```
---
🔄 Reset completo do sistema
```bash
docker compose down -v
docker system prune -a
docker volume prune
docker compose up --build
```
---
📌 Regras de negócio
SKU único (case-insensitive)
Estoque não pode ser negativo
Produtos inativos podem ser filtrados (admin)
Validações no backend e frontend
---
🧠 Decisões técnicas
Arquitetura desacoplada (frontend/backend)
Context API para autenticação
Axios interceptors para sessão
Prisma ORM para banco de dados
Uso estratégico de `useMemo` e `useCallback`
Componentização reutilizável
---
📊 Funcionalidades
Login e cadastro de usuários
Dashboard com gráficos e métricas
CRUD de produtos
Gestão de usuários
FAQ e suporte
Perfil de usuário
---
📬 Contato
📧 Email: giuliatrevisan.job@gmail.com
📱 Telefone: (85) 98233-3175
---
🙏 Agradecimento
Agradeço pela oportunidade e pelo processo seletivo.
Tenho muito interesse em fazer parte da equipe do Radar Saúde.
