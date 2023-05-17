import { Sequelize } from "sequelize";

import envConfig from "../../helpers/environment-config.helper";

const sequelize = new Sequelize({
  database: envConfig.get("DATABASE_NAME") || "assignment-database",
  username: envConfig.get("DATABASE_USERNAME") || "postgres",
  password: envConfig.get("DATABASE_PASSWORD") || "root",
  host: envConfig.get("DATABASE_HOST") || "localhost",
  port: envConfig.get("DATABASE_PORT") ? Number(envConfig.get("DATABASE_PORT")) : 5432, 
  dialect: "postgres",
});


sequelize.authenticate().then(() => {
    console.log("Database connection is successful")
}).catch((err) => {
    console.log("An error occured while trying to connect with the database", err.stack);
})

export { sequelize };