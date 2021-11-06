const router = require('express').Router();
const { Exercise, User } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      // include: [{ model: User }],
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:id', async (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
//   try {
//     const categoryData = await Category.findByPk(req.params.id, {
//       //include is going to make the join 
//       include: [{ model: Product }],
//     });

//     if (!categoryData) {
//       res.status(404).json({ message: 'No category found with that id!' });
//       return;
//     }

//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post('/', async (req, res) => {
//   // create a new category
//   try {
//     const categoryData = await Category.create({
//       category_name: req.body.category_name,
//     });
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(400).json(err);
//   }

// });

// router.put('/:id', async (req, res) => {
//   // update a category by its `id` value
//   try {
//     const userData = await Category.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!userData[0]) {
//       res.status(404).json({ message: 'No user with this id!' });
//       return;
//     }
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
//   Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedCategory) => {
//       res.json(deletedCategory);
//     })
//     .catch((err) => res.json(err));
// });

module.exports = router;
