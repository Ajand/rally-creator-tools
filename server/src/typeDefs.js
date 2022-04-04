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
    amount: Float!
  }

  type Poll {
    pollString: String
    creator: User
    active: Boolean
    isVoted: Boolean!
    isEligible: Boolean!
    votes: Int!
    voteWeights: [VoteWeight]
    _id: ID!
  }

  type Event {
    _id: ID!
    selectedCoin: String!
    amount: Int!
    owner: String!
    isClaimable: Boolean!
    title: String!
    codes: [Code!]!
    isEligible: Boolean!
    isClaimed: Code

  }

  type Code {
    _id: ID!
    claimed: Boolean!
    claimedBy: String
    body: String!
  }

  type Query {
    me: User
    myPolls: [Poll!]!
    poll(_id: ID!): Poll
    myEvents: [Event!]!
    event(_id: ID!): Event
  }

  type Mutation {
    authorize: String!
    createPoll(pollString: String!): String!
    vote(pollId: ID!, option: Int!): String!
    deactivePoll(pollId: ID!): String!
    activatePoll(pollId: ID!): String!

    createEvent(title: String!, selectedCoin: String!, amount: Float!): Event!
    addCode(eventId: String!, body: String!): Code!
    deleteCode(eventId: String!, codeId: ID!): String!
    claim(eventId: String!): String!
  }
`;

module.exports = typeDefs;
