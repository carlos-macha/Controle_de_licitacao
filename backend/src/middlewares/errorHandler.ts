import {
    Request,
    Response,
    NextFunction
} from "express";
import { ZodError } from "zod";

const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.error(error);

    if (error instanceof ZodError) {

        return res.status(400).json({
            error: "Erro de validação.",
            details: error.issues.map(issue => ({
                campo: issue.path.join("."),
                mensagem: issue.message
            }))
        });
    }

    if (error instanceof SyntaxError && "body" in error) {

        return res.status(400).json({
            error: "JSON malformado."
        });
    }

    const status = error.status || 500;

    const message = error.message || "Internal Server Error";

    return res.status(status).json({
        error: message
    });
};

export default errorHandler;