const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`

  type Query {
    a: String!
  }
  
  type Mutation {
    authorize: String!
  }
`;

module.exports = typeDefs;