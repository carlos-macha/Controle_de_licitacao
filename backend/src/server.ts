import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import "./containers";

import { container } from "./containers";
import { FirebirdDatabase } from "./database/firebird";

import app from "./app";

const PORT = process.env.PORT || 3000;

const db = container.get(FirebirdDatabase);

db.connect()
    .then(() => {
        console.log("Banco conectado.");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Erro ao conectar ao banco:", err);
    });