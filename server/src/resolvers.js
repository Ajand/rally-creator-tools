const getAuthorizationUrl = require('./getAuthorizationUrl')

const resolvers = {
  Query: {
  },

  Mutation: {
    authorize: () => getAuthorizationUrl(),
  },
};

module.exports = resolvers;
