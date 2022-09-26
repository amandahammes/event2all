import express from "express";
import routes from "./routes";
import cookie from "cookie-parser";
var cors = require("cors");

const app = express();

app.use(cookie());
app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
