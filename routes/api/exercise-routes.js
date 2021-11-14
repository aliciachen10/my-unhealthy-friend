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

//working function
async function edamamData(calories_burned, preference) {

  try { //use an await on the get request and an await on the response 

    const calories_burned_rounded = Math.round(Math.floor(calories_burned));
    const response = await got(`https://api.edamam.com/api/recipes/v2?type=public&q=${preference}&app_id=ae9304a1&app_key=1a636d7810dc05429f16a21db43490f2&calories=${calories_burned_rounded}`, { responseType: 'json'});
    // const response = await got(`https://api.edamam.com/api/food-database/v2/parser?app_id=64a0e39a&app_key=90e521d5fd7b9f2ee89888aaa573e898&ingr=mexican&nutrition-type=cooking&category=fast-foods&calories=500`, { responseType: 'json'});
    const result = await response;
    // let recipe_dict = [];
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

function edamamv2() {https.get('https://api.edamam.com/api/food-database/v2/parser?app_id=64a0e39a&app_key=90e521d5fd7b9f2ee89888aaa573e898&ingr=mexican&nutrition-type=cooking&category=fast-foods&calories=500', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  return resp.on('end', () => {
    const foodSuggestion = JSON.parse(data)['hints'][0]['food']['label']
    return foodSuggestion;
    
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});}

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

  // Duration of physical activity in minutes × (MET × 3.5 × your weight in kg) / 200 = Total calories burned.
  // METs for jogging/running and swimming = 7
  // METs for cycling = 5

  //NEED TO INPUT USER WEIGHT BASED ON USER ID. this needs to be replaced with a call with the user's weight.
  const user_weight = 68;
  try {
    let calories_burned; //ADD SESSIONS IN ORDER TO GET THE USERWEIGHT INSTEAD OF HAVING IT BE HARDCODED
    //DON'T ADD TOO MANY PROPERTIES TO CURRENTUSER
    //REQ.SESSION.CURRENTUSER (DEFINE THE PROPERTIES FOR CURRENT USER CURRENTUSER.USERWEIGHT) --> USERWEIGHT
    if (req.body.activity_id === 1 || req.body.activity_id === 3) {
      calories_burned = (req.body.duration * (7 * 3.5 * user_weight)) / 200;
    } else if (req.body.activity_id === 2) {
      calories_burned = (req.body.duration * (5 * 3.5 * user_weight)) / 200;
    }

    let exerciseData = await Exercise.create({
      distance: req.body.distance,
      duration: req.body.duration,
      activity_id: req.body.activity_id, //need to make this responsive w/ frontend dropdown input
      calories_burned,
      user_id: req.body.user_id, //NEED TO INPUT USER ID BASED ON AUTH
    });
    const preference = 'chinese';
    const myRecommendation = await edamamData(calories_burned, preference);
    res.status(200).json({exercises: exerciseData.dataValues, recommendations: myRecommendation});
    // res.render("all", { exercises: exerciseData.dataValues, recommendations: userRecommendations });

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
  const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=64a0e39a&app_key=90e521d5fd7b9f2ee89888aaa573e898&ingr=mexican&nutrition-type=cooking&category=fast-foods&calories=${calories}`)
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
