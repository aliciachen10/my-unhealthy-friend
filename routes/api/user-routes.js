const router = require('express').Router();
const { unsubscribe } = require('.');
const { Exercise, User, Activity, Category, Preference } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

// The `/api/users` endpoint

//get all users, with their exercises and preferences
router.get('/allUser', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Exercise }, { model: Category }],
    });
    // res.status(200).json(userData);
    const users = userData.map((user) => user.get({ plain: true }));
    // res.render('users', { users });
    res.status(200).json(userData)
    // console.log(req.session.loggedIn)
  } catch (err) {
    res.status(500).json(err);
  }
});

//new route to get user with exercises
// Use withAuth middleware to prevent access to route
router.get('/', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Exercise }, {model: Category}],
    });

    const user = userData.get({ plain: true });
    res.render('all', {
      ...user,
      loggedIn: true
    });
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
    res.render('users', { users});
  } catch (err) {
    res.status(500).json(err);
  }
  
});


//create a new user
router.post('/', async (req, res) => {
   console.log("<<<create user post working")
  // {
  //   "firstName": "Andy",
  //   "lastName": "Alexander",
  //   "height": 72,
  //   "weight": 175
// }
  try {
    
    const newUser = req.body

    const userData = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      height: req.body.height,
      weight: req.body.weight,
      email: req.body.email,
      password: req.body.password 
    });

    const userData_found = await User.findOne({where: { email: req.body.email }});

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = userData_found.id
      req.session.weight = userData_found.weight;
      res.status(200).json(userData);
    });

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
    // console.log(user)
    res.status(200).json(userData)
    // res.render('user', {user});
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

//get all exercises by user id -- this what will display the exercise history for each user! 
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
  console.log("console log req.body", req.body)
  try {
    const userData = await User.findOne({include: [{ model: Category }], 
      where: { email: req.body.email }});
    console.log("userData>>>", userData)
    
    //collect the user's preferences in a user_preferences array here so that we can pass that as a property of the session
    const user_preferences = [];
    for (var i = 0; i < userData.categories.length; i++) {
      user_preferences.push(userData.categories[i].category_name)
    }

    if (!userData) {
      
      res.status(404).json({ message: '1Login failed. Please try again!' });
      return;
    }
  
    console.log("<<<<<<<", req.body.password);
    console.log("<<<<<<<", userData.password);
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    console.log("validpassword>>>>", validPassword)
  
    if (!validPassword) {
      res.status(400).json({ message: '2Login failed. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.email = req.body.email
      req.session.user_id = userData.id;
      req.session.weight = userData.weight;
      // req.session.preferences = userData.categories;
      req.session.loggedIn = true;
    
    res.status(200).json({ message: 'You are now logged in!' })
  });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



module.exports = router;
