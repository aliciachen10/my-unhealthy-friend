const seedUsers = require("./user-seed");
const seedExercises = require("./exercise-seeds");
const seedCategories = require("./category-seeds");
const seedActivities = require("./activity-seeds");
const seedPreferences = require("./preference-seeds")

const sequelize = require("../config/connection");


const seedAll = async () => {
    await sequelize.sync({ force: true });
    
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedActivities();
    console.log('\n----- ACTIVITIES SEEDED -----\n');

    await seedExercises();
    console.log('\n----- Exercises SEEDED -----\n');

    await seedCategories();
    console.log('\n----- CATEGORIES SEEDED -----\n');

    await seedPreferences();
    console.log('\n----- PREFERENCES SEEDED -----\n');

    process.exit(0);
};

seedAll();
