import { DataSource } from "typeorm";
import { Channels } from "../entities/Channels";
import { Keywords } from "../entities/Keywords";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "telegram_finder",
  synchronize: true,
  logging: false,
  entities: [Channels, Keywords],
  subscribers: [],
  migrations: [],
});
