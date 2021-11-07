const router = require('express').Router();
const { Exercise, User, Activity, Category, Preference } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      include: [{ model: User }, { model: Activity }],
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new exercise. creating happens in this format: 
//   {
//     distance: 4.6,
//     duration: 40,
//     calories_burned: 500,
//     activity_id: 2,
//     user_id: 3,
// },

// insert in metequation

  if (activity_id === 1) {
    // calories_burned = 

  // Duration of physical activity in minutes × (MET × 3.5 × your weight in kg) / 200 = Total calories burned.
  // METs for jogging/running and swimming = 7
  // METs for cycling = 5
  } else {

  }
  try {
    const exerciseData = await Exercise.create({
      distance: req.body.distance,
      duration: req.body.duration,
      calories_burned: req.body.calories_burned, //NEED TO PUT THE EQUATION IN
      activity_id: req.body.activity_id, //need to make this responsive w/ frontend dropdown input
      user_id: req.body.user_id //NEED TO INPUT USER ID BASED ON AUTH
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(400).json(err);
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
