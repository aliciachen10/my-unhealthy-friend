async function preferenceSubmit(event) {
  event.preventDefault();
  const preferenceSelections = [];

  const preferences = document.getElementsByName('preference')

  for (i = 0; i < preferences.length; i++) {
      if (preferences[i].checked) {
          preferenceSelections.push(preferences[i].value)
      }
  };
  console.log("preferenceSelections", preferenceSelections)
  for (i = 0; i < preferenceSelections.length; i++) {
      let category_id = []

      if (preferenceSelections[i] === 'italian') {
          category_id = 1;
         preferenceDbAdd(1);
      } else if (preferenceSelections[i] === 'chinese') {
          category_id = 2;
         preferenceDbAdd(2);
      } else if (preferenceSelections[i] === 'french') {
          category_id = 3
         preferenceDbAdd(3);
      } else if (preferenceSelections[i] === 'american') {
          category_id = 4

         preferenceDbAdd(4);
      } else if (preferenceSelections[i] === 'indian') {
          category_id = 5
         preferenceDbAdd(5);
         
      } else if (preferenceSelections[i] === 'fast-food') {
          category_id = 6
         preferenceDbAdd(6);

      } else if (preferenceSelections[i] === 'mexican') {
          category_id = 7
         preferenceDbAdd(7);

      } else if (preferenceSelections[i] === 'thai') {
          category_id = 8
         preferenceDbAdd(8);

      } else if (preferenceSelections[i] === 'japanese') {
          category_id = 9
         preferenceDbAdd(9);

      } else {
        //irish
          category_id = 10
         preferenceDbAdd(10);

      }
    
  }     

  console.log("preferenceSelections>>>", preferenceSelections)
async function preferenceDbAdd(category_id) {
    const response = await fetch(`/api/preferences/`, {
      method: "POST",
      body: JSON.stringify({
        category_id: category_id,
        user_id: userId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
      if (response.ok) {
    document.location.replace('/app');
  } else {
    alert('Failed to log in.');
  }

}
  
}
document.querySelector('#preference-submit').addEventListener("click", preferenceSubmit)