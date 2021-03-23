// import the gql tagged template function
const { gql } = require('apollo-server-express');

//create our typeDefs
//instructing our query that we'll return an array
//with custom datatype below, we are able to instruct the thoughts query so that each 
//thought that returns can include _id, thoughttext, createdAt, reactionCount, and username- with
//their respective GraphQL scalars

//we now have it set up so that when we run the thoughts query, we cna also list the
//reactions field to get back an array  of reaction data for each thought.  

// User type definition: we define that a user will return all the data in their Mongoose model
//Friends is an array that will be populated with data that adheres to the User type. 
//The thoughts field is an array of Thought types.  
const typeDefs = gql`
    
    type Thought {
        _id: ID
        thoughtText: String
        createdAt: String
        username: String
        reactionCount: Int
        reactions: [Reaction]
    }

    type Reaction {
        _id: ID
        reactionBody: String
        createdAt: String
        username: String
    }

    type User {
        _id: ID
        username: String
        email: String
        friendCount: Int
        thoughts: [Thought]
        friends: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User

        thoughts(username: String): [Thought]
        thought(_id: ID!): Thought
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addThought(thoughtText: String!): Thought
        addReaction(thoughtId: ID!, reactionBody: String!): Thought
        addFriend(friendId: ID!): User
    }

`;
//we've defined our thoughts query that it could receive a parameter if we wanted
//in this case the parameter would be identified as username and would have string datatype
//export the typeDefs
module.exports = typeDefs;