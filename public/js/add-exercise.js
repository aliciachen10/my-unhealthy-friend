
async function edamamData(calories_burned, preference) {

  try { //use an await on the get request and an await on the response 

    const calories_burned_rounded = Math.round(Math.floor(calories_burned));

    const response = await got(`https://api.edamam.com/api/food-database/v2/parser?app_id=64a0e39a&app_key=90e521d5fd7b9f2ee89888aaa573e898&ingr=${preference}&nutrition-type=cooking&category=fast-foods&calories=${calories_burned_rounded}`, { responseType: 'json'});
    // const response = await got(`https://api.edamam.com/api/food-database/v2/parser?app_id=64a0e39a&app_key=90e521d5fd7b9f2ee89888aaa573e898&ingr=mexican&nutrition-type=cooking&category=fast-foods&calories=500`, { responseType: 'json'});
    const result = await response;
    console.log(">>>>>>WHERE IS THE COKE>>>>>", result.body.hints[0].food.label);

    return result.body.hints[0].food.label
    // console.log(response.body.explanation);
  } catch (error) {
    console.log(error)
    // console.log(error.response.body);
  }
};

async function newFormHandler(event) {
  event.preventDefault();
  const distance = document.querySelector('#distance').value;
  const duration = document.querySelector('#duration').value;
  const weight = document.querySelector('#weight').value;
  const exercise_type = document.querySelector('#exercise-type').value;
  let activity_id;
  
  if (exercise_type === "running") {
    activity_id = 1
  } else if (exercise_type === "cycling") {
    activity_id = 2
  } else if (exercise_type === "swimming") {
    activity_id = 3
  }

  //need to change this value so it's not hardcoded and responsive to user
  const user_id = 1;

  const response = await fetch(`/api/exercises`, {
    method: 'POST',
    body: JSON.stringify({
      distance,
      duration,
      activity_id,
      user_id
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const formattedResponse = await response.json();
  console.log("user_id", user_id)
  const recommendation_div = document.querySelector(".RECOMMENDATIONS-DIV")
  console.log("reccommendation div>>>", recommendation_div)
  recommendation_div.innerHTML = formattedResponse.recommendations.foodName
  
  formattedResponse.exercise.forEach(exercise => {
    const card = `<div class="card exercise col-md-4">
    <div class="card-content">
      <h4 class="card-title">
        <a href="http://aliciachen10.github.io/weather-dashboard">
          Activity
        </a>
      </h4>
      <p class="">
        {{!-- <p>ID: ${exercise.id}.</p> --}}
        <p>Distance: {{exercise.distance}} miles</p>
        <p>Duration: {{exercise.duration}} minutes</p>
        <p>Calories burned: {{exercise.calories_burned}} kCal</p>
        <p>When you did it: {{exercise.createdAt}}</p>
      </p>
    </div>
    <div class="card-read-more">
      <a
        href="http://github.com/aliciachen10/weather-dashboard"
        class="btn btn-link btn-block"
      >
        Get suggestions
      </a>
    </div>
  </div>`
  })
  
  if (response.ok) {
    // document.location.replace('/');
    console.log(formattedResponse)
  } else {
    alert('Failed to add dish');
  }
}

document.querySelector('.new-exercise-form').addEventListener('submit', newFormHandler);
