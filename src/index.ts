import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import routes from "./routes";
import "dotenv/config";
const bodyParser = require('body-parser');

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const PORT = 5000;

    app.use(
      cors({
        credentials: true,
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: ["Origin", "Content-Type", "Authorization", "Accept"],
        preflightContinue: true,
      })
    );

    app.get("/", (req, res) => {
      res.send(`Hello, World! Express on Railways`);
    });

    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
    app.use(express.json());
    app.use("/api/v1", routes);

    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
