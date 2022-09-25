const { User, Thought } = require('./../models');
const users = require('./users');
const thoughtsFromDB = require('./thoughts');
const db = require('./../config/connection')


const seeder = async () => {
    try {
        await db;
        console.log('connected');

        await Thought.deleteMany();
        await User.deleteMany();
        console.log(`cleared the DB`);

        await User.insertMany(users);
        const thoughts = await Thought.insertMany(thoughtsFromDB);

        for (const thought of thoughts) {
            await User.findOneAndUpdate(
                { username: thought.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
        };
        const userData = await User.find().populate('thoughts')
        console.log('Seed Successful');
        console.log(JSON.stringify(userData, null, 2));
    } catch (error) {
        console.error(error);
    }
    process.exit(0)
};

seeder();


