const { Preference } = require('../models')

const preferenceData = [
{
    user_id: 3,
    category_id: 2
},
{
    user_id: 2,
    category_id: 1
},
{
    user_id: 4,
    category_id: 3
},
{
    user_id: 2,
    category_id: 4
},
{
    user_id: 1,
    category_id: 5
},
];

const seedPreference = () => Preference.bulkCreate(preferenceData);


module.exports = seedPreference
