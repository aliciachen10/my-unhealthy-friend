const router = require('express').Router();
const { Exercise, User, Activity, Category, Preference } = require('../../models');

// The `/api/users` endpoint

//get all users, with their exercises and preferences
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Exercise }, { model: Preference }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create a new user
router.post('/', async (req, res) => {
  // {
  //   "firstName": "Andy",
  //   "lastName": "Alexander",
  //   "height": 72,
  //   "weight": 175
// }
  try {
    const userData = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      height: req.body.height,
      weight: req.body.weight
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get one user by id
router.get('/:id', async (req, res) => {
  // find a user tag by its `id`
  // be sure to include its associated exercise and preference data
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Exercise }, { model: Preference }],
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a user's weight by a user's `id` value
router.put('/:id', async (req, res) => {
  //request format below to update id = 1, Andy Alexander from 175 --> 180 pounds 
//   {
//     "weight": 180
// }
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
