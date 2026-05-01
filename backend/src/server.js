import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";

import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import userRoutes from "./routes/user.routes.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

// rotas públicas
app.use("/auth", authRoutes);

// rotas protegidas
app.use("/products", productRoutes);

// 👇 SEMPRE por último
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.use("/users", userRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));