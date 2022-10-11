import express from "express";
import routes from "./routes";
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
