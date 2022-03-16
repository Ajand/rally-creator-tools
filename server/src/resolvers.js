const getAuthorizationUrl = require("./users/getAuthorizationUrl");
const User = require("./models/User");
const Poll = require("./models/Poll");
const getBalance = require("./users/getBalance");
const Vote = require("./models/Vote");

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
    isVoted: (p, _, { user }) => {
      return !!Vote.methods.isVoted(user.id, p._id);
    },
    isEligible: (p) => {
      return User.methods.queries
        .get(p.creator)
        .then((u) => getBalance(u.rnbUserId, p.token))
        .then((b) => b > 0)
        .catch((err) => {
          throw new Error(err);
        });
    },
    votes: (p) => {
      return Vote.methods
        .getVotes(p._id)
        .then((votes) => votes.length)
        .catch((err) => {
          throw new Error(err);
        });
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
    vote: async (_, { pollId, option }, { user }) => {
      const poll = await Poll.methods.get(pollId);
      const balance = await getBalance(user.rnbUserId, poll.tokenm);
      await Vote.methods.create({
        voter: user.id,
        pollId,
        option,
        weight: balance,
      });
      return "Done!";
    },
  },
};

module.exports = resolvers;
