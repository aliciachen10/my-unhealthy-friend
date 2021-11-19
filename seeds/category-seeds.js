const { Category } = require('../models')

const categoryData = [

{
    category_name: 'italian',
},
{
    category_name: 'chinese',
},
{
    category_name: 'french',
},
{
    category_name: 'american',
},
{
    category_name: 'indian',
},
{
    category_name: 'fast-food',
},
{
    category_name: 'mexican',
},
{
    category_name: 'thai',
},
{
    category_name: 'japanese',
},
{
    category_name: 'irish',
},

];

const seedCategory = () => Category.bulkCreate(categoryData);


module.exports = seedCategory
