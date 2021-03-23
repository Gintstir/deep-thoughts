const { User, Thought} = require("../models");

//when we query thoughts, we perform a .find() method on the Thoughty model, 
//also returning the data in descending order as be seen in the .sort() method that
//we chained on.  We don't need to worry about error handling bc Apollo can infer if
//something goes wrong.  

//we pass in the "parent" as a placeholder parameter.  It wont be used but we need something 
//in that first parameter's spot so we can access the username argument from the second parameter.  
//We use a ternary operator ? : to check if username exists.  If it does we set params to an
//object with a username key set to that value.  If it doesnt we return an empty object.  
//we then pass that object, with or without data to the .find() method.  If there's data
//it will perform a lookup specific to the username.  If its empty it will return all every thought.
const resolvers = {
    Query: {
        //get all thoughts- optionally search for thought by username
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        //get one thought by _id
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },
        //get on user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts')
        },
    }
};

module.exports = resolvers;