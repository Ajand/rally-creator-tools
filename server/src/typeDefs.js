const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    createdTimestamp: String
    username: String!
    rallyNetworkWalletIds: [String]
  }

  type Query {
    me: User
  }

  type Mutation {
    authorize: String!
  }
`;

module.exports = typeDefs;
