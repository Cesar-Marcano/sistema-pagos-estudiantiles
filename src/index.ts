// Load .env environment variables
import "./config/loadEnv";

import express from "express";
import morgan from "morgan";

// local imports
import { router } from "./router";
import { executeInDev } from "./config/envVariables";
import helmet from "helmet";

// express instance
const app = express();

// middlewares
app.use(helmet());

// dev middlewares
executeInDev(() => {
  app.use(morgan("dev"));
});

// router
app.use("/api", router);

// express start
app.listen(3000, () => {
  console.log("Server on port 3000");
});
