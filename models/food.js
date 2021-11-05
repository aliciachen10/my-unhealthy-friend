const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection")

class Food extends Model {}

Food.init( 
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        food_name: { 
            type: DataTypes.STRING,
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        }
    },
    {
      sequelize,
      timeStamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "food"
    }
);

module.exports = Food