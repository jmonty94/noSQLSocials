const { User, Thought } = require('./../models');

const allThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            {
                new: true
            },
        );
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        await User.findOneAndUpdate(
            { username: thought.username },
            {
                $pull: {
                    thoughts: thought._id,
                },
            },
        );
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const newThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(
            { username: req.body.username },
            {
                $push: {
                    thoughts: thought._id
                }
            });
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {
                $pull: {
                    reactions: { reactionId: req.params.reactionId, },
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const newReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {
                $addToSet: {
                    reactions: req.body,
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    allThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    newThought,
    removeReaction,
    newReaction,
}