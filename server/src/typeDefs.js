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
    isVoted: Boolean!
    isEligible: Boolean!
  }

  type Query {
    me: User
    myPolls: [Poll!]!
    poll(_id: ID!): Poll!
  }

  type Mutation {
    authorize: String!
    createPoll(pollString: String!): String!
    vote(pollId: ID!, option: Int!): String!
  }
`;

module.exports = typeDefs;
