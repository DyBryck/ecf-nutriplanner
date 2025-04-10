import cors from "cors";
import express from "express";
import helmet from "helmet";
import router from "./routes/routes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

export default app;
