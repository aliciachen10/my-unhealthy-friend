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

  console.log("user_id", user_id)

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add dish');
  }
}

document.querySelector('.new-exercise-form').addEventListener('submit', newFormHandler);
