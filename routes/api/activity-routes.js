const router = require('express').Router();
const { Exercise, User, Activity, Category, Preference  } = require("../../models")


router.get('/', async (req, res) => {
    try {
        const activityData = await Activity.findAll({
            include: [{ model: Exercise}],
        });
        res.status(200).json(activityData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {

    try { 
        const activityData = await Activity.findByPk(req.params.id, {
            include: [{ model: Exercise}],
        });
            if (!activityData){
                res.status(404).json({ message: 'No user found with that id!'});
                return;
            }
            res.status(200).json(activityData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router