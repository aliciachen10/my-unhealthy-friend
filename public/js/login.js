const loginFormHandler = async (event) => {
    event.preventDefault();

const email = document.querySelector('#email-login').value.trim();
const password = document.querySelector('#password-login').value.trim();

if (email && password) {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log in.');
    }
}
};


//<<<<<<<<******* We need to add more fields into the sign up area 

const signupFormHandler = async (event) => {
    event.preventDefault();
    
    const firstName = document.querySelector('#first-name-signup').value.trim();
    const lastName = document.querySelector('#last-name-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const weight = document.querySelector('#weight-signup').value.trim();
    const height = document.querySelector('#height-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, username, email, password, weight, height }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);