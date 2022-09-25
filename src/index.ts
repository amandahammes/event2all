import { AppDataSource } from "./datasource";
import express from "express";
import routes from "./routes";
import cookie from "cookie-parser";
// var cool = require('cool-ascii-faces');
var cors = require('cors');


AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cookie())
  app.use(cors())
  app.use(express.json());

  app.use(routes);

  return app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT}`)
  });
}).catch((error) => console.log(error))