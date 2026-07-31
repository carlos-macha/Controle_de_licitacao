import cors from "cors";
import express from "express";
import produtoRouter from "./routes/produto.route";
import concorrenteRouter from "./routes/concorrente.route";
import usuarioRouter from "./routes/usuario.route";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use(cors());

app.use(produtoRouter);
app.use(usuarioRouter);
app.use(concorrenteRouter);

app.use(errorHandler);

export default app;