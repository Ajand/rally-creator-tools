const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    createdTimestamp: String
    username: String!
    rallyNetworkWalletIds: [String]
  }

  type Poll {
    pollString: String
    creator: User
    active: Boolean
  }

  type Query {
    me: User
    myPolls: [Poll!]!
  }

  type Mutation {
    authorize: String!
    createPoll(pollString: String!): String!
  }
`;

module.exports = typeDefs;
