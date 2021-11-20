# my unhealthy friend
## concept
the best anti - my fitness pal app of all time. My Unhealthy Friend allows a user to find dietary options that fit their lifestyle and personal preferences. It uses activity data and user supplied preferences in order to provide possible meal choices, keeping within calorie expenditure. 
Read more about the concept [here](https://docs.google.com/presentation/d/1wxW50L7zG5RX4WtW5pbF5NQbHtr4I6cTq_Pp0wecp7M/edit#slide=id.p).

## motivation for devekopment and purpose
Many applications exist today that allow a user to track what they eat and workouts, with the seeming purpose of tracking and maintaining a calorie deficit. However, many people workout with the intention of making a larger variety of dietary choices available to them. Our application allows a user to track workouts and caloric expenditure, with the intent of using this data to confirm what they’re able to consume with “zero guilt.” We seek to give a user options that they can “get away with” health wise, as opposed to giving options that are specifically “best” for a user’s diet at any given point. In doing so, we hope to provide a more fun way for a user to find manageable dietary choices.

## how to access the app
Check out our app deployed [here](https://murmuring-depths-69285.herokuapp.com/). Alternatively, you can also perform these steps to access the app manually:
1. clone our repo
2. create a .env file with the below information
3. make sure you have MySQL set up on your local machine! 
4. run npm install
5. run mysql -u root -p
6. run source db/schema.sql, then quit
7. run npm run seed
8. run node server.js (or nodemon server.js)
9. open up localhost:3001 in your browser and enjoy! 

### .env file contents
DB_NAME=inverseFitBit_db
DB_USER=root
DB_PASSWORD='YOUR DB PASSWORD'
SESSION_SECRET=secret

## team
Alicia Chen, Andrew Bumgarner, Angela Krider, Cam Herbert, Forrest Pangle

## tools used
we utilized bootstrap for styling, handlebars, express/node for the backend, a RESTful API, some momentJS, and incorporated authentication. We also used Sequelize ORM and MySQL for the database. Edamam API used to receive recipe recommendations. (Thanks, Edamam!) 
