const path = require('path');

const express = require('express');
//import Apollo server
const { ApolloServer } = require('apollo-server-express');
//import middleware function
const { authMiddleware } = require('./utils/auth');

//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas')
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

//create new Apollo server and pass in our schema data

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

//integrate our Apollo server with Express application as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//serve up static assets: check to see if Node environment is in production.  If it is,
//we instruct the Express.js server to serve any files in the React application's build dir.
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
// a wildcard GET route for the server.  If we make a GET request to any location on the server
// that doesnt have an explicit route defined, respond with the production ready React front end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
  });
});
