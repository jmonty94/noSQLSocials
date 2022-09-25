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
        const userId = req.params.userId;
        const currentUser = await User.findById(userId);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
            },
        );
        if(req.body.username) {
            const thoughts = await Thought.find();

            for (let i = 0; i < thoughts.length; i++) {
                if (thoughts[i].username === currentUser.username) {
                    thoughts[i].username = req.body.username  
                }
                for (let i = 0; i < thoughts.reactions.length; i++) {
                    if (thoughts.reactions[i].username === currentUser.username) {
                        thoughts.reactions[i].username = req.body.username;
                    }
                }
            }
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
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