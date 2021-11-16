

const preferenceSubmit = (event) => {
    event.preventDefault();
    
   
    const preferenceSelections = [];

    const preferences = document.getElementsByName('preference')
    for (i = 0; i < preferences.length; i++) {
        if (preferences[i].checked) {
            preferenceSelections.push(preferences[i].value)
        }
    };


    for (i = 0; i < preferenceSelections.length; i++) {
        let category_id = []

        if (preferenceSelections[i] === 'italian') {
            category_id = 1;
            preferenceDbAdd(category_id)
        } else if (preferenceSelections[i] === 'chinese') {
            category_id = 2;
            preferenceDbAdd(category_id)
        } else if (preferenceSelections[i] === 'french') {
            category_id = 3
            preferenceDbAdd(category_id)
        } else if (preferenceSelections[i] === 'american') {
            category_id = 4
            preferenceDbAdd(category_id)
           
        } else if (preferenceSelections[i] === 'indian') {
            category_id = 5
            preferenceDbAdd(category_id)
           
        } else if (preferenceSelections[i] === 'mexican') {
            category_id = 6
            preferenceDbAdd(category_id)
            
        } else {
            //thai
            category_id = 7
            preferenceDbAdd(category_id)
          
        }
    }    
};

const user_id = 1;

const preferenceDbAdd = async (category_id) => {

    if (category_id) {
        const response = await fetch(`/api/preferences`, {
            method: "POST",
            body: JSON.stringify({
              category_id,
                user_id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
          console.log("huh?")
          if (response.ok) {
              console.log('does this even work?')
            document.location.replace('/app');
          } else {
            alert('Failed to add preference');
          }
    }
}




document.querySelector('#preference-submit').addEventListener("click", preferenceSubmit)