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
    });
    // res.status(200).json(exerciseData);
    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true }));
    res.render('all', { exercises,
      loggedIn: req.session.loggedIn
     })
  } catch (err) {
    res.status(500).json(err);
  }
  
});

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