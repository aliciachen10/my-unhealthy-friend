const router = require('express').Router();
const exerciseRoutes = require('./exercise-routes');
// const preferenceRoutes = require('./preference-routes');
// const userRoutes = require('./user-routes');

router.use('/exercises', exerciseRoutes);
// router.use('/preferences', preferenceRoutes);
// router.use('/users', userRoutes);

module.exports = router;
