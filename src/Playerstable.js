import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ReactTable from 'react-table';

export default class Playerstable extends React.Component {
  render() {
    const data = [
    {
            id: `${id}`,
            username: `${username}`,
            name: `${name}`,
            age: `${age}`,
    },
  ];
  const columns = [
    {
        header: 'Username',
        accessor: 'username'
    }, {
        header: 'Name',
        accessor: 'name'
    }, {
        header: 'Age',
        accessor: 'age'
    }
  ];

  const Playertable = () => (
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
        <ReactTable
        data={data}
        columns={columns}
        />
          <p>{`${username} is ${name}`}</p>
        </div>
     ))
    }}
    </Query>
  );

  return (
    <div>
    <div className="playertable">{Playertable}</div>
    <ReactTable
    data={data}
    columns={columns}
    />
    </div>
  )
  }
}
