const { User } = require('../models')

const userData = [

{
    firstName: 'Andy',
    lastName: 'Alexander',
    height: 72,
    weight: 175,
    // preference_id: 4
},
{
    firstName: 'Cam',
    lastName: 'Camou',
    height: 73,
    weight: 250,
    // preference_id: 2
},
{
    firstName: 'Forrest',
    lastName: 'Federline',
    height: 69,
    weight: 155,
    // preference_id: 5
},
{
    firstName: 'Alicia',
    lastName: 'Albright',
    height: 63,
    weight: 110,
    // preference_id: 1
},
{
    firstName: 'Angela',
    lastName: 'Anderson',
    height: 65,
    weight: 125,
    // preference_id: 8
},
];

const seedUser = () => User.bulkCreate(userData);


module.exports = seedUser
