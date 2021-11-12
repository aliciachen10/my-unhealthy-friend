
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [8],
            },
          }
        },
    {
      hooks: {
        
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.email = await updatedUserData.email.toLowerCase();
          return updatedUserData;
        },
        beforeCreate: async (newUserData) => {
          newUserData.email = await newUserData.email.toLowerCase();
          return newUserData;
        },

        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },

        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        },
      },
    


      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "user"
    }
  );


module.exports = User
