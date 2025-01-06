import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "./data-source";
import express = require('express');
const cors = require('cors');
import routes from "./routes";
import bodyParser = require("body-parser");

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const PORT = process.env.PORT || 5000;

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

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    app.get("/test", (req, res) => {
      res.send("Test route is working!");
    });
    
  })
  .catch((error) => console.log(error));
