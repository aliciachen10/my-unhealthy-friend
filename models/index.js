const User = require("./user");
const Category = require("./category");
const Exercise = require("./exercise");
const Activity = require("./activity");
const Preference = require("./preference");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
User.hasMany(Exercise, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

module.exports = { User, Category, Exercise, Activity, Preference}

