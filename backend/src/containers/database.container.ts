import container from "./container";
import { FirebirdDatabase } from "../database/firebird";

container
    .bind(FirebirdDatabase)
    .toSelf()
    .inSingletonScope();