const router = require('express').Router();
const got = require('got');
const { unsubscribe } = require('./api');
const { Exercise, User, Activity, Category, Preference } = require('../models');
const bcrypt = require('bcrypt');
var moment = require('moment');

// The `/api/exercises` endpoint

//get all exercises, with their exercises and preferences
router.get('/', async (req, res) => {
  try {
    // const exerciseData = await Exercise.findAll({
    //   include: [{ model: User }, { model: Activity }],
    //   where: { 
    //     user_id: req.session.user_id 
    //   },
    // });
    // res.status(200).json(exerciseData);
    // const exercises = exerciseData.map((exercise) => exercise.get({ plain: true })).reverse();
    res.render('homepage', { 
      loggedIn: req.session.loggedIn,
      // user_id: req.session.user_id
     })
  } catch (err) {
    res.status(500).json(err);
  }
  
});

//render user's exercise history
//get all exercises, with their exercises and preferences
router.get('/app', async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      include: [{ model: User }, { model: Activity }],
      where: { 
        user_id: req.session.user_id 
      },
    });

    const userData = await User.findOne({include: [{ model: Category }], where: { id: req.session.user_id }});

    req.session.save(() => {
      req.session.loggedIn = true;
      // req.session.preferences = userData.categories;
    });
  

    const exercises = exerciseData.map((exercise) => exercise.get({ plain: true })).reverse();

    // let exerciseTime = [];
    // let date;
    // let m; 
    // let formattedDate;
    // for (i = 0; i < exercises.length; i++) {
    //   // moment(exercises[i].createdAt, )
    //   // date = new Date(exercises[i].createdAt.substring(0,9))
    //   console.log(date)
    //   // m = moment(date)
    //   // console.log(date)
    //   // formattedDate = m.format('l')
    //   exerciseTime.push(exercises[i].createdAt.substring(0,9))
    // }
    // console.log(exerciseTime)
    // console.log(exercises.map((exercise) => moment(exercise.createdAt).format('l')))
    // console.log("here are exercises >>>", exercises)
    res.render('all', { exercises,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
      preferences: req.session.preferences
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

router.get('/preference', (req, res) => {
  try {
    
    res.render('preference', {
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    })

  } catch (err) {
    res.status(500).json(err)
  }
  
});



//logout route


module.exports = router;