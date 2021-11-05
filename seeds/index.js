const seedUsers = require("./user-seed");
const seedFoods = require("./food-seeds");
const seedExercises = require("./excercise-seeds");
const seedCategories = require("./category-seeds");
const seedActivities = require("./activity-seeds");


const sequelize = require("../config/connection");


const seedAll = async () => {
    await sequelize.sync({ force: true });
    
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedFoods();
    console.log('\n----- FOODS SEEDED -----\n');

    await seedExercises();
    console.log('\n----- Exercises SEEDED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedActivities();
    console.log('\n----- ACTIVITIES SEEDED -----\n');

    process.exit(0);
};

seedAll();