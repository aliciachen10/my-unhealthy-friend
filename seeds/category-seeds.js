const { Category } = require('../models')

const categoryData = [

{
    category_name: 'Italian',
},
{
    category_name: 'Chinese',
},
{
    category_name: 'French',
},
{
    category_name: 'American',
},
{
    category_name: 'Indian',
},
{
    category_name: 'Fast Food',
},
{
    category_name: 'Mexican',
},
{
    category_name: 'Thai',
},

];

const seedCategory = () => Category.bulkCreate(categoryData);


module.exports = seedCategory
