
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}


User.init( 
    { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        // preference: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'preference',
        //         key: 'id'
        //     }
        // }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "user"
    }
  );


module.exports = User
