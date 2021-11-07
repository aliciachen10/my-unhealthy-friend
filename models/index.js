const User = require("./user");
const Category = require("./category");
const Exercise = require("./exercise");
const Activity = require("./activity");
const Preference = require("./preference");


//Expected Behavior: when a get  User request is made for User then User data should be pulled with... 
//each of the food categories that user prefers listed beneath it. 

User.belongsToMany(Category, {
  through: Preference,
  foreignKey: "user_id"
});

//Expected Behavior: when a get User request is made for Category then the Category data should be pulled with..
//the User data listed beneath the Category data that it corresponds with. 

Category.belongsToMany(User, {
  through: Preference,
  foreignKey: "category_id"
});

//Expected Behavior: when a get User request is made then the user data will be retrieved with...
//the categories mentioned above and the Exercise data. 

User.hasMany(Exercise, {
  foreignKey: "user_id",
});

Exercise.belongsTo(User, {
  foreignKey: "user_id"
});



//Expected Behavior: when a get Exercise request is made the Exercise data will be retrieved with the activity data below it
// Exercise.hasOne(Activity, {
//   foreignKey: 'exercise_id',
//   onDelete: 'CASCADE',
// });

// Activity.belongsTo(Exercise, {
//   foreignKey: 'exercise_id',
// });

//REWRITTEN SO THAT THE ROUTES WORK 
Exercise.belongsTo(Activity, {
  foreignKey: 'activity_id',
  onDelete: 'CASCADE',
});

Activity.hasMany(Exercise, {
  foreignKey: 'activity_id',
});

//REWRITTEN: ADDED PREFERENCES
Preference.belongsTo(User, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE',
});

User.hasMany(Preference, {
  foreignKey: 'user_id',
});


module.exports = { User, Category, Exercise, Activity, Preference}

