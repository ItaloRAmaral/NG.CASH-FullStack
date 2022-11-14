require("dotenv/config");

import { Options } from "sequelize";

const config: Options = {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "123456",
  database: "NG",
  port: 5433,
  dialectOptions: {
    timezone: "Z",
  },
  logging: false,
  define: {
    timestamps: true,
  },
};

module.exports = config;
