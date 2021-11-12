const { User } = require('../models')

const userData = [

{
    firstName: 'Andy',
    lastName: 'Alexander',
    height: 72,
    weight: 175,
    email: 'andrewBum@gmail.com',
    password: 'test'
    // preference_id: 4
},
{
    firstName: 'Cam',
    lastName: 'Camou',
    height: 73,
    weight: 250,
    email: 'CamCam@gmail.com',
    password: 'test'
    // preference_id: 2
},
{
    firstName: 'Forrest',
    lastName: 'Federline',
    height: 69,
    weight: 155,
    email: 'Forrester@gmail.com',
    password: 'test'
    // preference_id: 5
},
{
    firstName: 'Alicia',
    lastName: 'Albright',
    height: 63,
    weight: 110,
    email: 'Alicia@gmail.com',
    password: 'testrestpest'
    // preference_id: 1
},
{
    firstName: 'Angela',
    lastName: 'Anderson',
    height: 65,
    weight: 125,
    email: 'Angela@gmail.com',
    password: 'test'
    // preference_id: 8
},
];

//add this to encrypt passwords
const seedUser = () => User.bulkCreate(userData, {individualHooks: true, returning: true});


module.exports = seedUser
