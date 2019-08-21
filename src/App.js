import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Players from './Players';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Query, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.client = new ApolloClient({
      uri: 'http://localhost:4000/graphql'
    })
  }

  render() {
    const allPlayers = gql`
    query players {
      players{
        id,
        username,
        name,
        age
      }
    }
    `;
/*
    const deletePlayer = gql`
    mutation deletePlayer(id: ID!) {
      deletePlayer{id: $id}
    }
    `;

    deleteRow() {
     const { deletePlayer } = this.props;
     deletePlayer({
       variables: { id: this.props.item.id },
       update: (store, { data: { deletePlayer } }) => {
               const playerId = deletePlayer;
               const data = store.readQuery({ query: allPlayers });
               _.remove(data.players, (o) => o.id == playerId);
               store.writeQuery({
                   query: allPlayers,
                   data
               });
           }
     })
   }
*/
    const columns = [
    {
        Header: 'Id',
        accessor: 'id',
        width: 100
    }, {
      Header: 'Username',
      accessor: 'username'
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Age',
      accessor: 'age',
      width: 150
    }, {
      Header: 'Actions',
      Cell: props =>{
        return (
          <button
          onClick={() => {
            this.deleteRow(props.original.id);
          }}
          >Delete</button>
        )
      },
      sortable: false,
      filterable: false
    }]

    function PlayerList({ loading, players}) {
      if (loading) {
        return <div>Loading</div>;
      } else {
        return (
          <div className="App">
          <ReactTable
          data={players}
          columns={columns}
          filterable
          />
          </div>
        );
      }
    }

    const PlayerListWithData = graphql(allPlayers, {
      props: ({data: { loading, players}}) => ({
        loading,
        players,
      }),
    })(PlayerList);

    return (
      <div className="App">
      <ApolloProvider client={this.client}>
      <PlayerListWithData />
      </ApolloProvider>
      </div>
    )
  }
}

export default App;
