const router = require('express').Router();
const { Exercise, User, Activity, Category, Preference  } = require("../../models")



router.get('/', async (req, res) => {
    try {
        const categoryData = await Category.findAll({
            include: [{ model: User}],
        });
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});




router.get('/:id', async (req, res) => {
    try {
        const categoryData = await Category.findByPk(req.params.id, {
            include: [{ model: User}],
        });
        if (!categoryData) {
            res.status(404).json({ message: 'No user found with that id!'});
            return;
        }
        res.status(200).json(categoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router
