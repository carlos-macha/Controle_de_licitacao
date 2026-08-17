import { RequestHandler, Router } from "express";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validade";
import { idParamSchema } from "../schemas/id.schema";

export function createCrudRoutes<T>(
    router: Router,
    path: string,
    controller: any,
    schemas: {
        create: any;
        update: any;
    },
    middlewares: RequestHandler[] = []
) {
    router.get(
        `/${path}`,
        authenticate,
        ...(middlewares ?? []),
        controller.find.bind(controller)
    );

    router.post(
        `/${path}`,
        authenticate,
        ...(middlewares ?? []),
        validate({
            body: schemas.create,
        }),
        controller.insert.bind(controller)
    );

    router.get(
        `/${path}/:id`,
        authenticate,
        ...(middlewares ?? []),
        validate({
            params: idParamSchema,
        }),
        controller.findById.bind(controller)
    );

    router.put(
        `/${path}/:id`,
        authenticate,
        ...(middlewares ?? []),
        validate({
            params: idParamSchema,
            body: schemas.update,
        }),
        controller.update.bind(controller)
    );

    router.delete(
        `/${path}/:id`,
        authenticate,
        ...(middlewares ?? []),
        validate({
            params: idParamSchema,
        }),
        controller.delete.bind(controller)
    );
}
