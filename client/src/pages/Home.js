import React from 'react';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList'

//importing the useQuery hook from Apollo's react hooks library- this will allow us to make 
//requests to the graphQL server we connected to and made available to the app using the
//apolloProvider component in App.js

//Also imported the QUERY_THOUGHTS query we just created, we just need to use the query
//with imported Hook functionality and we'll be able to query thought data.  
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';



const Home = () => {

  //use useQuery hook to make a query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  //use object destructuring to extract 'data' from the 'useQuery' Hooks response and rename it
  //'userData' to be more descriptive- Now if the user is logged in and has a valid token, userData will
  //hold all of the returned info from our query.  
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  const loggedIn = Auth.loggedIn();

  return (
    <main>      
      <div className='flex-row justify-space-between'>
        {/* Here we are conditionally defining the laout for this <div> If the user isnt logged in
        itll span the the full width if the row.  If logged in itll only span 8 cols leaving space for
        a four col <div> on the rioghjt side*/}        
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
          )}
        
        
        <div className={`col-12 mb-3' ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
          <div>Loading...</div>
        ) : (
          <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />        
        )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
            username={userData.me.username}
            friendCount={userData.me.friendCount}
            friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
