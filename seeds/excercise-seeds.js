const { Exercise } = require('../models')

const exerciseData = [

{
    distance: 4.6,
    duration: 40,
    calories_burned: 500,
    activity_id: 2,
    user_id: 3,
},
{
    distance: 1,
    duration: 15,
    calories_burned: 400,
    activity_id: 1,
    user_id: 4,
},
{
    distance: 9,
    duration: 40,
    calories_burned: 558,
    activity_id: 2,
    user_id: 2,
},
{
    distance: 10,
    duration: 200,
    calories_burned: 1674,
    activity_id: 3,
    user_id: 1,
},
{
    distance: 8,
    duration: 35,
    calories_burned: 1104,
    activity_id: 2,
    user_id: 1,
},

];

const seedExercise = () => Exercise.bulkCreate(exerciseData);


module.exports = seedExercise
