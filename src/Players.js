import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTable from 'react-table';

const Players = () => (
  <Query query={gql`
    {
    players {
      id
      username
      name
      age
    }
  }
  `}
  >

  {({loading, error, data}) => {
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error:(</p>
/*
      return data.players.map(({currentPlayer}) => (
        <Player player={currentPlayer} />
      ));
*/
    return data.players.map(({id, username, name, age,}) => (
      
      <div key={id}>
        <p>{`${username} is ${name}`}</p>
      </div>
   ))
  }}
  </Query>
);

export default Players;
