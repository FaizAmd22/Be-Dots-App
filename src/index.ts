import { AppDataSource } from "./data-source";
const express = require("express"); // Gunakan import modern
const cors = require("cors"); // Gunakan import modern
import routes from "./routes";
import "dotenv/config";
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// Debug untuk melihat struktur direktori
console.log("Listing build directory contents:");
console.log(fs.readdirSync(path.resolve(__dirname, ".")));

// Inisialisasi TypeORM dan aplikasi Express
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected!");

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
      res.send(`Hello, World! Express on Vercel`);
    });

    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
    app.use(express.json());
    app.use("/api/v1", routes);

    app.get("/test", (req, res) => {
      res.send("Test route is working!");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Ekspor aplikasi untuk platform seperti Vercel
    return app;
  } catch (error) {
    console.error("Error initializing database or server:", error);
    process.exit(1);
  }
};

// Jalankan server hanya jika tidak dalam mode "test"
startServer();

// Ekspor aplikasi untuk platform seperti Vercel
export default startServer;
