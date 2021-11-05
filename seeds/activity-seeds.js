const { Activity } = require('../models')

const activityData = [

{
    activity_name: 'running',
},
{
    activity_name: 'cycling',
},
{
    activity_name: 'swimming',
}

];

const seedActivity = () => Activity.bulkCreate(activityData);


module.exports = seedActivity