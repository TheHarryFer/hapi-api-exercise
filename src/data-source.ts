import { DataSource } from "typeorm";

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_SCHEMA,
  synchronize: true,
  logging: false,
  entities: ["./src/entity/*.ts"],
  subscribers: [],
  migrations: [],
});
