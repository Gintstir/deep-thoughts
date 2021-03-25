import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// importing react-router-dom components and renaming browserrouter to router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//importing page components
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

//with this code we establish a new connection to the GraphQl server using Apollo.  
const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});
//uri: 'http://localhost:3001/graphql we used the absolute path before to test the route 
//but we can't use that in production.

//with this request config we use the .setContext() method to set the HTTP request headers of ecery request
//to include the toke, whether ther request needs it or not.  If thie request doesnt need the toke, our
//server side resolber function wont check for it


//passing the client variable in as the value for the client prop in the provider.  
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
