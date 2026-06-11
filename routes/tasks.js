const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
});

router.post('/', authMiddleware, async (req, res) => {
    const { title, desc } = req.body;
    const task = await Task.create({ title, desc, user: req.user.id });
    res.json(task);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { title, desc } = req.body;
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { title, desc },
        { new: true }
    );
    res.json(task);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ success: true });
});

module.exports = router;