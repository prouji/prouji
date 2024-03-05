// src/data-source.ts or at the top of src/index.ts
import { DataSource } from "typeorm";
import { User } from "./entity/User"; // Import your entities
import { Post } from "./entity/Post";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "graphql",
    synchronize: true,
    logging: false,
    entities: [User, Post], // Add all your entities here
    // migrations and subscribers can also be added here if you use them
});
