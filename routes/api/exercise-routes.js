const router = require("express").Router();
const {
  Exercise,
  User,
  Activity,
  Category,
  Preference,
} = require("../../models");

// The `/api/categories` endpoint

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
  const user_weight = 68;
  try {
    let calories_burned; //ADD SESSIONS IN ORDER TO GET THE USERWEIGHT INSTEAD OF HAVING IT BE HARDCODED 
    //DON'T ADD TOO MANY PROPERTIES TO CURRENTUSER 
    //REQ.SESSION.CURRENTUSER (DEFINE THE PROPERTIES FOR CURRENT USER CURRENTUSER.USERWEIGHT) --> USERWEIGHT 
    if (req.body.activity_id === 1 || req.body.activity_id === 3 ) {
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

    
    //NEED TO INPUT USER WEIGHT BASED ON USER ID. this needs to be replaced with a call with the user's weight.
    res.render("all", { exercises: exerciseData.dataValues });
    // res.render(200).json(exerciseData.dataValues);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get("/api/activities", async (req, res) => {
  // const { activities } = req.body;
  // const preferences = await User.find() **this is whatever you do to get the preferences
  // const activityCalories = ** whatever you do to calculate activity calories
  // const recommendations = await fetch(`https://edemamapi.com/search?key={{blahblahblah}}&calories=${activityCalories}&diet=${preferences}`);
  // after this you might want to serialize the data and pull off only what you need to send to the client
  // const userReccomendations = recommendations.map(r => ({ calories: r.calories, fat: r.fat, ingredients: r.ingredients }));
  // res.render('whateveryourviewisnamed', userRecommendations);
// });

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
