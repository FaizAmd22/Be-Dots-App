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
    url: "postgresql://dbdots_user:W7bkxPrabq6CV04MSVJY2yWkUnppdpRd@dpg-ctu1k25ds78s73fk38rg-a.oregon-postgres.render.com/dbdots",
    // host: process.env.POSTGRES_HOST,
    // username: process.env.POSTGRES_USER,
    // password: process.env.POSTGRES_PASSWORD,
    // database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: false, 
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
})
