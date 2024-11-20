import "reflect-metadata";
import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: "roundhouse.proxy.rlwy.net",
//   port: 14881,
//   username: "postgres",
//   password: "WYHWNlEnbGBEYUoIASDuztHRXfNkXxdO",
//   database: "railway",
//   synchronize: true,
//   logging: false,
//   entities: ["src/entities/*.ts"],
//   migrations: ["src/migrations/*.ts"],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
    type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "postgres",
    // password: "224422",
    // database: "circleProject",
    url: "postgres://default:jK6otJYdZX9k@ep-small-morning-a4nd7whx-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
    // host: process.env.POSTGRES_HOST,
    // username: process.env.POSTGRES_USER,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false, 
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    subscribers: [],
})
