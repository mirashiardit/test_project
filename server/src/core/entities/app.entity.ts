import { DataTypes, Model, Optional } from "sequelize";

import { sequelize } from "../../infrastructure/database/connection";

interface AppAttributes {
  id: string;
  name: string;
  url: string;
  startTime: Date;
}

interface ExtendedAppAttributes extends AppAttributes {
  screenshotCount?: number;
}

interface AppCreationAttributes extends Optional<AppAttributes, "id"> {}

class App
  extends Model<AppAttributes, AppCreationAttributes>
  implements AppAttributes
{
  id!: string;
  name!: string;
  url!: string;
  startTime!: Date;
}

App.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "apps",
    underscored: true,
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("App table synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export { App, ExtendedAppAttributes as ExtendedApp };
