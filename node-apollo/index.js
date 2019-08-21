const { ApolloServer, gql } = require('apollo-server');
const _ = require('lodash');

const players = [
  {
    id: 1,
    username: 'kcolfyksor',
    name: 'Ben Lew',
    age: 20,
  },
  {
    id: 2,
    username: 'roskyflock',
    name: 'June Wong',
    age: 23,
  },
  {
    id: 3,
    username: 'sourcucumber',
    name: 'Alex Ng',
    age: 31,
  },
  {
    id: 4,
    username: 'jasminnn',
    name: 'Jasmine Lee',
    age: 19,
  },
  {
    id: 5,
    username: 'jordenmichel',
    name: 'William Shakeleg',
    age: 24,
  },
  {
    id: 6,
    username: 'coolcat',
    name: 'Michael Tan',
    age: 18,
  },
  {
    id: 7,
    username: 'moneybluffy',
    name: 'Terry Crews',
    age: 44,
  },
  {
    id: 8,
    username: 'jelinthom',
    name: 'Lucy Chong',
    age: 29,
  },
  {
    id: 9,
    username: 'veryalmostmaybe',
    name: 'Kendrick Lanmar',
    age: 17,
  },
  {
    id: 10,
    username: 'whydowestruggle',
    name: 'Isaac Newton',
    age: 33,
  },
];

const typeDefs = gql`
    type Player {
      id: Int,
      username: String,
      name: String,
      age: Int
    }

    type Query {
      players: [Player]
    }

    type Mutation {
      deletePlayer(id: ID!): ID
    }
`;

const resolvers = {
  Query: {
    players: () => players
  },
  Mutation: {
    deletePlayer: (root, {id}) => {
      _.remove(players, (o) => o.id == id);
      return id;
    }
  }
}

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
