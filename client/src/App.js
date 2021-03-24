import React from 'react';

import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';


import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//with this code we establish a new connection to the GraphQl server using Apollo.  
const client = new ApolloClient({
  uri: '/graphql'
})
//uri: 'http://localhost:3001/graphql we used the absolute path before to test the route 
//but we can't use that in production.


//passing the client variable in as the value for the client prop in the provider.  
function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
