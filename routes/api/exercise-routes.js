const router = require("express").Router();
// const fetch = require('node-fetch');
const https = require('https');
const got = require('got');
const {
  Exercise,
  User,
  Activity,
  Category,
  Preference,
} = require("../../models");
const { Console } = require("console");
const withAuth = require('../../utils/auth');

//working function
async function edamamData(calories_burned, preference) {
  try { //use an await on the get request and an await on the response 

    const calories_burned_rounded = Math.round(Math.floor(calories_burned));
    const response = await got(`https://api.edamam.com/api/recipes/v2?type=public&q=${preference}&app_id=ae9304a1&app_key=1a636d7810dc05429f16a21db43490f2&calories=${calories_burned_rounded}`, { responseType: 'json'});
    console.log("what preference is being piped in there anyway?", preference)
    const result = await response;
    let recipe_dict = []
    for (i = 0; i < result.body.hits.length; i++) {
      let single_recipe = {};
      single_recipe['uri'] = result.body.hits[i].recipe.url
      single_recipe['calories'] = result.body.hits[i].recipe.calories
      single_recipe['image'] = result.body.hits[i].recipe.image
      single_recipe['label'] = result.body.hits[i].recipe.label
      recipe_dict.push(single_recipe)

    }
    return recipe_dict
  } catch (error) {
    console.log(error)
  }
};

// The `/api/exercises` endpoint

router.get("/", async (req, res) => {
  try {
    const exerciseData = await Exercise.findAll({
      include: [{ model: User }, { model: Activity }],
    });
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new exercise. creating happens in this format:
  //   {
  //     "distance": 4.6,
  //     "duration": 40,
  //     "calories_burned": 500,
  //     "activity_id": 2,
  //     "user_id": 3,
  // },

  try {
    let calories_burned; 

    if (req.body.activity_id === 1 || req.body.activity_id === 3) {
      calories_burned = (req.body.duration * (7 * 3.5 * req.session.weight)) / 200;
    } else if (req.body.activity_id === 2) {
      calories_burned = (req.body.duration * (5 * 3.5 * req.session.weight)) / 200;
    }

    let exerciseData = await Exercise.create({
      distance: req.body.distance,
      duration: req.body.duration,
      activity_id: req.body.activity_id, 
      calories_burned,
      user_id: req.session.user_id, 
      // user_id: req.body.user_id
    });

    //INSERT IN HERE TO GET REQ.SESSION.PREFERENCES SINCE IT ISN'T BEING RECOGNIZED 
    const userData = await User.findOne({include: [{ model: Category }], where: { id: req.session.user_id }});
    // console.log("GETTING USER DATA????", userData.dataValues.categories)
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.preferences = userData.categories;
    });
    console.log("userData>>>", userData)
    //get an array of string preferences from req.session.preferences 
    //preference_array should return an array that looks like this: ['italian', 'chinese', 'american', 'mexican']
    let preference_array = [];
    userData.categories.forEach(entry => preference_array.push(entry.category_name))
    console.log(userData.categories)
    console.log('preference_array', preference_array)
    //get a random entry from the user preference array 
    let chooseRandomPreference = Math.floor(Math.random() * preference_array.length);
    //console.log here? 
    //pass the calories burned and the random preference to the get edamamData function
    const myRecommendation = await edamamData(calories_burned, preference_array[chooseRandomPreference]);
    res.status(200).json({exercises: exerciseData.dataValues, recommendations: myRecommendation, user_id: req.session.user_id});
    
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/user/:user_id', async (req, res) => {
  // find a user tag by its `id`
  // be sure to include its associated exercise and preference data
  try {
    const userData = await Exercise.findAll( //to do: need to change this to findAll
      {
        where: { 
          user_id: req.params.user_id 
        },
      }
    )

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }
    const user = userData.get({ plain: true});
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

async function getEdamamData(calories) {
  const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=64a0e39a&app_key=${process.env.EDAMAM_API_KEY}&ingr=mexican&nutrition-type=cooking&category=fast-foods&calories=${calories}`)
  const recommendations = await response.json();
}

//get one exercise by exercise id
// will be useful for displaying exercise history
router.get("/:id", async (req, res) => {
  try {
    const exerciseData = await Exercise.findByPk(req.params.id, {
      include: [{ model: User }, { model: Activity }],
    });

    if (!exerciseData) {
      res.status(404).json({ message: "No exercise found with that id!" });
      return;
    }
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a exercise by its `id` value
// TO DO: need to make sure the update gets updated and is NOT returned as a string
router.put("/:id", async (req, res) => {
  try {
    const exerciseData = await Exercise.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!exerciseData[0]) {
      res.status(404).json({ message: "No exercise session with this id!" });
      return;
    }
    res.status(200).json(exerciseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete an exericse by its `id` value
router.delete("/:id", (req, res) => {
  Exercise.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedExercise) => {
      res.json(deletedExercise);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
