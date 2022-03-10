const getAuthorizationUrl = require('./users/getAuthorizationUrl')

const resolvers = {
  Query: {
  },

  Mutation: {
    authorize: () => getAuthorizationUrl(),
  },
};

module.exports = resolvers;
