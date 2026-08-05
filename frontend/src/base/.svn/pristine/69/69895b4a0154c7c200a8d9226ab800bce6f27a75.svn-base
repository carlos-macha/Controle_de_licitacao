import axios from "axios";

export async function fetchWithRetry<T>(request: () => Promise<T>, maxRetries = 5, delayMs = 3000): Promise<T> {
  let lastError: unknown = new Error("Erro desconhecido");

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await request();
    } catch (err) {

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status && status >= 400 && status < 500) {
         throw err;
        }
      }

      lastError = err;

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError;
}