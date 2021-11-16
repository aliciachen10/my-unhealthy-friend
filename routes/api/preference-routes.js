const router = require('express').Router();
const { Exercise, User, Activity, Category, Preference } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const preferenceData = await Preference.findAll({
      // include: [{ model: User }],
    });
    res.status(200).json(preferenceData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new preference
router.post('/', async (req, res) => {
  //format for this request: 
//   {
//     "user_id": 3,
//     "category_id": 6
// }
  try {
    const preferenceData = await Preference.create({
      user_id: req.body.user_id,
      category_id: req.body.category_id
      // height: req.body.height,
      // weight: req.body.weight
    });

    //check this
    // const userData = await User.findOne({include: [{ model: Category }], where: { id: req.session.user_id }});

    // req.session.save(() => {
    //   req.session.loggedIn = true;
      // req.session.preferences = userData.categories;
    // });

    res.status(200).json({preferenceData});
  } catch (err) {
    res.status(400).json(err);
  }
});

// create new preference by user id
router.post('/:user_id', async (req, res) => {
  //format for this request: 
//   {
//     "user_id": 3,
//     "category_id": 6
// }
  try {
    const preferenceData = await Preference.create({
      user_id: req.params.user_id,
      category_id: req.body.category_id
      // height: req.body.height,
      // weight: req.body.weight
    });
    res.status(200).json({preferenceData});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/', (req, res) => {
  //format for this request: 
//   {
//     "user_id": 3,
//     "category_id": 2
// }

  // delete one preference id by its user id and category id
  Preference.destroy({
    where: {
      user_id: req.body.user_id,
      category_id: req.body.category_id
    },
  })
    .then((deletedPreference) => {
      res.json(deletedPreference);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
