import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../infrastructure/database/connection";

interface ScreenshotAttributes {
  id: string;
  appId: string;
  imageUrl: string;
  timestamp: Date;
}

interface ScreenshotCreationAttributes
  extends Optional<ScreenshotAttributes, "id"> {}

class Screenshot
  extends Model<ScreenshotAttributes, ScreenshotCreationAttributes>
  implements ScreenshotAttributes
{
  id!: string;
  appId!: string;
  imageUrl!: string;
  timestamp!: Date;
}

Screenshot.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    appId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "screenshots",
    underscored: true,
    timestamps: false,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Screenshot table synced successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export { Screenshot };
