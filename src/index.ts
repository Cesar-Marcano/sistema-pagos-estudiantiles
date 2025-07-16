// Load .env environment variables
import "./config/loadEnv";

import express from "express";
import morgan from "morgan";

// local imports
import { router } from "./router";
import { executeInDev } from "./config/envVariables";
import helmet from "helmet";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

// express instance
const app = express();

// middlewares
app.use(express.json());
app.use(helmet());

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
  console.log("Server on port 3000");
});
