
const { timeStamp } = require("console");
const { Model, DataTypes } = require("sequelize");
const sequelize = require ("../config/connection");

class Activity extends Model {}


Activity.init (
    {
       type: DataTypes.INTEGER,
        allowNull: false,
    },
    {
        activity_name: DataTypes.STRING,
        allowNull: false
    },
    {
      sequelize,
      timeStamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "activity"
    }
)

module.exports = Activity

