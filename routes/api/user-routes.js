const router = require('express').Router();
const { unsubscribe } = require('.');
const { Exercise, User, Activity, Category, Preference } = require('../../models');
const bcrypt = require('bcrypt');

// The `/api/users` endpoint

//get all users, with their exercises and preferences
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Exercise }, { model: Category }],
    });
    res.status(200).json(userData);
    const users = userData.map((user) => user.get({ plain: true }));
    console.log("here are users ", users)
    res.render('users', { users })
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/exercises', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Exercise }, { model: Category }],
    });
    res.status(200).json(userData);
    const users = userData.map((user) => user.get({ plain: true }));
    console.log("here are users ", users)
    res.render('users', { users })
  } catch (err) {
    res.status(500).json(err);
  }
  
});

//get all users, with their exercises and preferences
// router.get('/exercises', async (req, res) => {
//   try {
//     const exerciseData = await Exercise.findAll({
//       // include: [{ model: User }, { model: Activity }],
//     });
//     console.log("myexercisedata >>>>", exerciseData)
//     // res.status(200).json(userData);
//     const exercise = exerciseData.map((exercise) => exercise.get({ plain: true }));
//     console.log("here are exercises ", exercise)
//     // res.render('all', { exercise })
//   } catch (err) {
//     res.status(500).json(err);
//   }
  
// });

//create a new user
router.post('/', async (req, res) => {
  // {
  //   "firstName": "Andy",
  //   "lastName": "Alexander",
  //   "height": 72,
  //   "weight": 175
// }
  try {

    const newUser = req.body
    newUser.password = await bcrypt.hash(req.body.password, 10);

    const userData = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      height: req.body.height,
      weight: req.body.weight,
      email: req.body.email,
      password: req.body.password 
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
      include: [{ model: Exercise }, { model: Category }],
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    const user = userData.get({ plain: true});
    console.log(user)
    res.render('user', user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update user values by user id value 
router.put('/:id', async (req, res) => {
  //request format below to update id = 1, Andy Alexander from 175 --> 180 pounds 
//   {
//     "weight": 180
// }
console.log(req.body)
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true //magic bullet
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

//get preferences by user
router.get('/:user_id/preferences', async (req, res) => {
  // find a user tag by its `id`
  // be sure to include its associated exercise and preference data
  try {
    const userData = await Preference.findAll( //to do: need to change this to findAll 
      {
        // Gets the book based on the isbn given in the request parameters
        where: { 
          user_id: req.params.user_id 
        },
      }
    )

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    // const user = userData.get({ plain: true});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all exercises by user id
router.get('/:user_id/exercises', async (req, res) => {
  // find a user tag by its `id`
  // be sure to include its associated exercise and preference data
  try {
    Exercise.findAll({ 
          where: { 
            user_id: req.params.user_id 
          }
        }).then(response => res.status(200).json(response))
    // const userData = await Exercise.findAll( //to do: need to change this to findAll
    //   // {
    //     // Gets the book based on the isbn given in the request parameters
    //     // where: { 
    //     //   user_id: req.params.user_id 
    //     // },
    //   // }
    // )

    // if (!userData) {
    //   res.status(404).json({ message: 'No user found with that id!' });
    //   return;
    // }
    // const user = userData.get({ plain: true});
    // res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((err) => res.json(err));
});


router.post('/login', async (req, res) => {
  try {
    // we search the DB for a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData)
    if (!userData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      //I put 1 before login so we know which one is failing
      res.status(404).json({ message: '1Login failed. Please try again!' });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    //I don't think the below compare is working because the passwords are the same but we still
    // get the next error message
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    console.log(req.body.password)
    console.log(userData.password)
    console.log(validPassword)
    //I'm getting valid password as false when they are the same. Use insomonia and use the consolelogs above
    //to see what I'm talking about here. 
    // if they do not match, return error message
    if (!validPassword) {
      res.status(400).json({ message: '2Login failed. Please try again!' });
      return;
    }
    // if they do match, return success message
    res.status(200).json({ message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
