> 🦉 *“Hoo... hoo... owl never sleeps.”*
> — Cú Đại Nhân 🦉

# todoX (Node.js + MongoDB)
A lightweight, modular node.js API for a web. Handles card with basic functions and UX/UI simple, friendly interface.

---

## Features
- RESTful resources: Tasks.
- Paging and filtering of task statuses.
- Input validation & error handling.
- CORS (allowlist) for the Render frontend.
- Production-safe Mongo connection & env validation.

---

## Tech
- **Node.js 20.12.x + Shadcn**
- **MongoDB Atlas** (Database)
- **ESLint** (babel parser)
- **Nodemon** (Build/Run)
- Deploy: **Render**

**Live:** https://todo-x-web.vercel.app/

---

## Preview

Here’s a quick look at the UI:

![todoX Demo](src/assets/demo.gif)

---

## Environment Variables
Create `packages/server/.env` (values are examples):

```dotenv
MONGO_CONNECTIONSTRING=mongodb+srv://<user>:<pass>@cluster.mongodb.net/?retryWrites=true&w=majority
PORT=''
```

*Important: **MONGODB_URI** must be a single line (no quotes, no line breaks).*

---

## Quick Start (after clone)

```bash
# 1) Require: Node.js >= 20+
node -v

# 2) Cài các dependency
npm install

# 3) Create file .env (example)
$envText = @"
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/?retryWrites=true&w=majority
PORT='5001'
NODE_ENV='production'
"@

# 4) Run dev
npm run dev
```
