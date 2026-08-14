import { injectable } from "inversify";
import { HttpError } from "../utils/httpError";

interface LoginAttempt {
    attempts: number;
    blockedUntil: number;
}

@injectable()
export class LoginAttemptService {

    private attempts = new Map<string, LoginAttempt>();

    check(login: string) {
        const key = login.toUpperCase();
        const attempt = this.attempts.get(key);



        if (!attempt) {
            return;
        }

        if (attempt.blockedUntil > Date.now()) {
            console.log(
                "BLOQUEADO:",
                key,
                "até:",
                new Date(attempt.blockedUntil).toLocaleString("pt-BR"),
                "faltam:",
                Math.ceil((attempt.blockedUntil - Date.now()) / 1000),
                "segundos"
            );
            const segundos = Math.ceil(
                (attempt.blockedUntil - Date.now()) / 1000
            );

            throw new HttpError(
                429,
                `Muitas tentativas de login. Tente novamente em ${segundos} segundos.`,
            );
        }
    }

    registerFailure(login: string) {
        const key = login.toUpperCase();

        const attempt = this.attempts.get(key) ?? {
            attempts: 0,
            blockedUntil: 0
        };

        attempt.attempts++;

        const delays = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            30_000,
            60_000,
            300_000
        ];

        const delay =
            delays[Math.min(attempt.attempts, delays.length - 1)];

        attempt.blockedUntil = Date.now() + delay;

        this.attempts.set(key, attempt);
    }

    clear(login: string) {
        this.attempts.delete(login.toUpperCase());
    }
}