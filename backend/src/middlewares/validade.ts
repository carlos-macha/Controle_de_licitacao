import { Request, Response, NextFunction } from "express";
import { z } from "zod";

interface ValidationSchemas {
    body?: z.ZodType;
    params?: z.ZodType;
    query?: z.ZodType;
}

export function validate(schemas: ValidationSchemas) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }

            if (schemas.params) {
                req.params = schemas.params.parse(
                    req.params
                ) as typeof req.params;
            }

            if (schemas.query) {
                req.query = schemas.query.parse(req.query) as typeof req.query;
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}
