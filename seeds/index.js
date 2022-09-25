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

        for(let i=0; i<thoughts.length; i++) {
            await User.findOneAndUpdate(
               {
                  username: thoughts.username
               },
               {
                  $push: {thoughts: thoughts._id}
               },
               {
                  new: true
               }
            );
        };
        console.log('Seed Successful');
    } catch (error) {
        console.error(error);
    }
};

seeder();


