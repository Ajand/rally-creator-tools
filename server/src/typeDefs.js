const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: String!
    createdTimestamp: String
    username: String!
    rallyNetworkWalletIds: [String]
  }

  type VoteWeight {
    option: Int!
    amount: Int!
  }

  type Poll {
    pollString: String
    creator: User
    active: Boolean
    isVoted: Boolean!
    isEligible: Boolean!
    votes: Int!
    voteWeights: [VoteWeight]
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
    deactivePoll(pollId: ID!): String!
    activatePoll(pollId: ID!): String!
  }
`;

module.exports = typeDefs;
