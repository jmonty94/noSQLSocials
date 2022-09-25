const { User, Thought } = require('./../models');

const allUsers = async (req,res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const userById = async (req,res) => {
    try {
        const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateUser = async (req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {
                new: true,
            },
        );
        // Update thoughs and comments if changing username
        if (req.body.username) {
            // update thoughts
            for (let i=0; i < updatedUser.thoughts.length; i++) {
                const thought = await Thought.findOne({ _id: updatedUser.thoughts[i] });
                for (let i=0; i < thought.reactions.length; i++) {
                    if (thought.reactions[i].username === thought.username) {
                        reaction.username = req.body.username;
                    }
                }
                thought.username = req.body.username;
                thought.save();
            };
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    };   
};

const deleteUser = async (req,res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
        await Thought.deleteMany({ username: user.username});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const newUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const addFriend = async (req,res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    friends: friendId,
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(user);
    } catch (error) {

        res.status(500).json({ error });
    }
};

const removeFriend = async (req,res) => {
    try {
        const userId = req.params.userId;
        const friendId = req.params.friendId;
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    friends: friendId,
                },
            },
            {
                new: true,
            },
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

module.exports = {
    allUsers,
    userById,
    updateUser,
    deleteUser,
    newUser,
    addFriend,
    removeFriend
}