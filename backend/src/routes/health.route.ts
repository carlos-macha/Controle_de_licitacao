import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/mobile/echo", (_, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date(),
    });
});

export default healthRouter;
