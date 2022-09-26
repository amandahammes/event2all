import { AppDataSource } from "./datasource";
import app from "./app";
import "reflect-metadata";

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

