import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
//import "./cron.js";
/* IMPORT ROUTES */
import authRoutes from "./routes/auth.js";
import dexGemsResearchRoutes from "./routes/dexGemsResearch.js";
import dexGemsRoutes from "./routes/dexGems.js";
import portfolioTokenRoutes from "./routes/portfolioToken.js";
import twitterRoutes from "./routes/twitter.js";

const PORT = process.env.PORT || 3001;

const app = express();

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, "../client/build")));

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/dexGemsResearch", dexGemsResearchRoutes);
app.use("/dexGems", dexGemsRoutes);
app.use("/portfolioToken", portfolioTokenRoutes);
app.use("/twitter", twitterRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

/* MONGOOSE SETUP */
mongoose
  .connect(process.env.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    console.log(mongoose.connection.readyState);
  })
  .catch((error) => console.log(`${error} did not connect`));
