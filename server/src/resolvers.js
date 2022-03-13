const getAuthorizationUrl = require("./users/getAuthorizationUrl");
const User = require("./models/User");
const Poll = require("./models/Poll");

const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      return user;
    },

    myPolls: (_, __, { user }) => {
      return Poll.methods
        .myPolls(user.id)
        .then((r) =>
          r.map((a) => ({ pollString: JSON.stringify(a), ...a._doc }))
        );
    },

    poll: (_, { _id }, {}) => {
      return Poll.methods
        .get(_id)
        .then((r) => ({ pollString: JSON.stringify(r), ...r._doc }));
    },
  },

  Poll: {
    creator: (p) => {
      return User.methods.queries.get(p.creator);
    },
    isVoted: (p) => {
      return false;
    },
    isEligible: (p) => {
      return true;
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
