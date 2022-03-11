const getAuthorizationUrl = require("./users/getAuthorizationUrl");
const User = require("./models/User");

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      return user;
    },
  },

  Mutation: {
    authorize: () => getAuthorizationUrl(),
  },
};

module.exports = resolvers;
