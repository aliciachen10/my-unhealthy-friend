const { Food } = require("../models");

const foodData = [
    {
        food_name: "Cheeseburger",
        calories: 600,
        category_id: [4, 6]
    },
    {
        food_name: "Pizza",
        calories: 1200,
        category_id: [1, 4, 6]
    },
    {
        food_name: "Egg Drop Soup",
        calories: 350,
        category_id: [2]
    },
    {
        food_name: "Chicken Tikka Massala",
        calories: 1000,
        category_id: [5]
    },
    {
        food_name: "Burrito",
        calories: 1400,
        category_id: [7]
    },
    {
        food_name: "Croque Madame",
        calories: 600,
        category_id: [3]
    },
    {
        food_name: "Bahn-Mi",
        calories: 650,
        category_id: [8]
    },
    {
        food_name: "Taco Bell Cheesey Gordita",
        calories: 600,
        category_id: [4, 6, 7]
    },
];

const seedFood = () => Food.bulkCreate(foodData);

module.exports = seedFood;