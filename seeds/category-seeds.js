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
    category_names: 'Fast Food',
},
{
    category_names: 'Mexican',
},
{
    category_names: 'Thai',
},

];

const seedCategory = () => Category.bulkCreate(categoryData);


module.exports = seedCategory