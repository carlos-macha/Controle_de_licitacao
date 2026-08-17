import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return res.status(429).json({
            error: "Muitas tentativas de login. Tente novamente mais tarde.",
        });
    },
});
