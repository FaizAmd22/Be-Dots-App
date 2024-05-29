import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "roundhouse.proxy.rlwy.net",
  port: 14881,
  username: "postgres",
  password: "WYHWNlEnbGBEYUoIASDuztHRXfNkXxdO",
  database: "railway",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
