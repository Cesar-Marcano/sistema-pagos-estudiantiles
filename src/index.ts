// Load .env environment variables
import "./config/loadEnv";

import express from "express";

// local imports
import { router } from "./router";

// express instance
const app = express();

// router
app.use('/api', router);

// express start
app.listen(3000, () => {
  console.log("Server on port 3000");
});
