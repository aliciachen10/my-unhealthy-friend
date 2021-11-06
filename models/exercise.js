const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection")


class Exercise extends Model {}

Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        distance: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        calories_burned: {
            type: DataTypes.INTEGER,
        },

        activity_id: { 
            type: DataTypes.INTEGER,
            references: {
                model: "activity",
                key: "id"
            }  
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: 'id'
            }
        }
    },
    {
      sequelize,
      timeStamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "exercise"
    }
);

module.exports = Exercise