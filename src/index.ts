// Load .env environment variables
import "./config/loadEnv";

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

// local imports
import { router } from "./router";
import { executeInDev } from "./config/envVariables";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { i18n } from "./lang/i18n";

// express instance
const app = express();

// middlewares
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

// dev middlewares
executeInDev(() => {
  app.use(morgan("dev"));
});

// router
app.use("/api", router);

// global error handler
app.use(globalErrorHandler);

// express start
app.listen(3000, () => {
  console.log(i18n`server.listening(${3000})`);
});
