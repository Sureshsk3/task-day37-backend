import express from "express";
import "dotenv/config.js";
import router from "./src/routes/indexRoutes.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(router);

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));
