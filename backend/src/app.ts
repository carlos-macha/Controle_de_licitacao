import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import usuarioRouter from "./routes/usuario.route";
import healthRouter from "./routes/health.route";
import importacaoLicitacaoRouter from "./routes/importacaoLicitacao.route";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json({ limit: "5mb" }));

app.use(cookieParser());
app.use(cors({
   origin: process.env.FRONT_URL,
   credentials: true
}));

app.use(usuarioRouter);
app.use(healthRouter);
app.use(importacaoLicitacaoRouter);

app.use(errorHandler);

export default app;