"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
// src/data-source.ts or at the top of src/index.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./entity/User"); // Import your entities
const Post_1 = require("./entity/Post");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "graphql",
    synchronize: true,
    logging: false,
    entities: [User_1.User, Post_1.Post], // Add all your entities here
    // migrations and subscribers can also be added here if you use them
});
