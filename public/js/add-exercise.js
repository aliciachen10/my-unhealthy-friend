async function newFormHandler(event) {
  event.preventDefault();
  const distance = document.querySelector("#distance").value;
  const duration = document.querySelector("#duration").value;
  const weight = document.querySelector("#weight").value;
  const exercise_type = document.querySelector("#exercise-type").value;

  let activity_id;

  const user_id = 2;
  
  if (exercise_type === "running") {
    activity_id = 1;
  } else if (exercise_type === "cycling") {
    activity_id = 2;
  } else if (exercise_type === "swimming") {
    activity_id = 3;
  }

  const response = await fetch(`/api/exercises`, {
    method: "POST",
    body: JSON.stringify({
      distance,
      duration,
      activity_id,
      user_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const formattedResponse = await response.json();
  const recommendation_div = document.querySelector(".recommendations-div");
  let final_recommendations = [];

  //filter the entries by calories manually
  for (var i = 0; i < formattedResponse.recommendations.length; i++) {
    if (formattedResponse.recommendations[i].calories < formattedResponse.exercises.calories_burned) {
      final_recommendations.push(formattedResponse.recommendations[i])
    }
  }
  console.log(final_recommendations)
  var cardDiv = {};
  var cardDate = {};

  //clear the html of the recommendation_div
  recommendation_div.innerHTML = "";
  //display how many calories a user has burned
  caloriesBurned = document.createElement("div");
  caloriesBurned.setAttribute("class", "card m-2 flex-grow"); 
  caloriesBurned.innerHTML = `You burned ${Math.round(formattedResponse.exercises.calories_burned)} calories.`
  recommendation_div.appendChild(caloriesBurned);

  if (final_recommendations.length > 1) {
    for (var i = 0; i < final_recommendations.length; i++) {
      cardDiv[i] = document.createElement("div");

      cardDiv[i].setAttribute("class", "card m-2 flex-grow"); //ml-3

      cardDate[i] = document.createElement("h5");
      cardDate[i].innerHTML = `<a href=${final_recommendations[i].uri}>${final_recommendations[i].label}</a>`
      cardDiv[i].appendChild(cardDate[i]);

      const weatherImg = document.createElement("img");
      weatherImg.setAttribute("class", "weather-image");
      weatherImg.src = final_recommendations[i].image
      cardDiv[i].appendChild(weatherImg);

      cardDiv[i].innerHTML +=
        "<p>Calories: " + Math.round(final_recommendations[i].calories)
        " \xB0F</p>";

      recommendation_div.appendChild(cardDiv[i]);
    }
  } else {
    cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card m-2 flex-grow");
    cardDiv.innerHTML += "Your activity didn't return any recommendations. It could be that you didn't burn enough calories to be recommended unhealthy food. :("
    recommendation_div.appendChild(cardDiv) 
  }

  //clear the current activity div and populate with all exercises for each user based off a get request 
  const activity_history = document.querySelector(".clear-class");
  activity_history.innerHTML = "";

  const activity_response = await fetch(`api/users/${user_id}/exercises`, {
    method: "GET",
    // body: JSON.stringify({
    //   distance,
    //   duration,
    //   activity_id,
    //   user_id,
    // }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const formattedActivityResponse = await activity_response.json();

  console.log(formattedActivityResponse)

  formattedActivityResponse.forEach(exercise => {
    const card = `<div class="card exercise col-md-4">
    <div class="card-content">
      <h4 class="card-title">
        <a href="http://aliciachen10.github.io/weather-dashboard">
          Activity
        </a>
      </h4>
      <p class="">
        <p>ID: ${exercise.user_id}</p>
        <p>Distance: ${exercise.distance} miles</p>
        <p>Duration: ${exercise.duration} minutes</p>
        <p>Calories burned: ${exercise.calories_burned} kCal</p>
        <p>When you did it: ${exercise.createdAt}</p>
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
    activity_history.innerHTML += card
  })

  if (response.ok) {
    // document.location.replace('/');
  } else {
    alert("Failed to add exercise");
  }
}

document
  .querySelector(".new-exercise-form")
  .addEventListener("submit", newFormHandler);
