const getAuthorizationUrl = require("./users/getAuthorizationUrl");
const User = require("./models/User");
const Poll = require("./models/Poll");

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      return user;
    },
  },

  Mutation: {
    authorize: () => getAuthorizationUrl(),
    createPoll: async (_, { pollString }, { user }) => {
      const pollObject = JSON.parse(pollString);
      try {
        await Poll.methods.createPoll({ ...pollObject }, user.id);
        return "Done";
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = resolvers;
