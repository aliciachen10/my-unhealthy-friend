const router = require('express').Router();
const got = require('got');
const { unsubscribe } = require('./api');
const { Exercise, User, Activity, Category, Preference } = require('../models');
const bcrypt = require('bcrypt');

// The `/api/exercises` endpoint

//get all exercises, with their exercises and preferences
router.get('/', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      include: [{ model: User }, { model: Activity }],
      where: { 
        user_id: req.session.user_id 
      },
    });
    // res.status(200).json(exerciseData);
    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true })).reverse();
    res.render('all', { exercises,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
     })
  } catch (err) {
    res.status(500).json(err);
  }
  
});

// sentencesList: function() {
//   return Session.get(SENTENCES).reverse();
// }

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

//logout route


module.exports = router;