import React from 'react';
import ThoughtList from '../components/ThoughtList'

//importing the useQuery hook from Apollo's react hooks library- this will allow us to make 
//requests to the graphQL server we connected to and made available to the app using the
//apolloProvider component in App.js

//Also imported the QUERY_THOUGHTS query we just created, we just need to use the query
//with imported Hook functionality and we'll be able to query thought data.  
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {

  //use useQuery hook to make a query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
        
        )}</div>
      </div>
    </main>
  );
};

export default Home;
