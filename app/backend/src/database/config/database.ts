require("dotenv/config");

import { Options } from "sequelize";

const config: Options = {
  dialect: "postgres",
  host: process.env.DB_HOST || "db",
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.PASSWORD || "123456",
  database: "NG-app",
  port: 5432,
  dialectOptions: {
    timezone: "Z",
  },
  logging: false,
  define: {
    timestamps: true,
  },
};

module.exports = config;
