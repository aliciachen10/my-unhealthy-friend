const {
    Model,
    DataTypes
} = require("sequelize");
const sequelize = require("../config/connection");

class Activity extends Model {}


Activity.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },


    activity_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, 
{
    sequelize,
    timeStamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "activity"
})

module.exports = Activity
