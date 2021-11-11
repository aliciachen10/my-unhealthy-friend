const router = require('express').Router();
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
    res.render('all', { exercises })
  } catch (err) {
    res.status(500).json(err);
  }
  
});

module.exports = router;