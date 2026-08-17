import container from "./container";

import { LoginAttemptService } from "../services/loginAttempt.service";

container.bind(LoginAttemptService).toSelf().inSingletonScope();
