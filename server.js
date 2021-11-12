const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./routes');
// const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;



const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false, // Alper touched on resave and saveUnitlialized by I don't really understand
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};
const hbs = exphbs.create({});
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
