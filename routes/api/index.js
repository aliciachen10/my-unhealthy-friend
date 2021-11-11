const router = require('express').Router();
const exerciseRoutes = require('./exercise-routes');
const preferenceRoutes = require('./preference-routes');
const userRoutes = require('./user-routes');
const activityRoutes = require('./activity-routes');
const categoryRoutes = require('./category-routes');


router.use('/exercises', exerciseRoutes);
router.use('/preferences', preferenceRoutes);
router.use('/users', userRoutes);
router.use('/activities', activityRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
