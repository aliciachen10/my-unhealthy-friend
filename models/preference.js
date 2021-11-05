const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Preference extends Model {}

Preference.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "category",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timeStamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "preference"
      }
);

module.exports = Preference

