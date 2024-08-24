import { DataSource } from "typeorm";
import { User } from "../../data/entities/User";
import { Resource } from "../../data/entities/Resource";

export const AppDataSource = new DataSource({
  type: "postgres", // or your database type
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  entities: [User, Resource],
  migrations: ["src/migrations/*.ts"],
  synchronize: false, // Set to false if you are using migrations
});

