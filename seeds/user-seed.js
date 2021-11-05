const { User } = require('../models')

const userData = [

{
    firstName: 'Andy',
    lastName: 'Alexander',
    height: 72,
    weight: 175,
    category_id: [1, 4, 8]
},
{
    firstName: 'Cam',
    lastName: 'Camou',
    height: 73,
    weight: 250,
    category_id: [2, 3, 8]
},
{
    firstName: 'Forrest',
    lastName: 'Federline',
    height: 69,
    weight: 155,
    category_id: [5, 6]
},
{
    firstName: 'Alicia',
    lastName: 'Albright',
    height: 63,
    weight: 110,
    category_id: [1, 2, 3, 4, 5, 6]
},
{
    firstName: 'Angela',
    lastName: 'Anderson',
    height: 65,
    weight: 125,
    category_id: [8, 7, 4, 3]
},

];

const seedUser = () => User.bulkCreate(userData);


module.exports = seedUser