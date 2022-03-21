const getAuthorizationUrl = require("./users/getAuthorizationUrl");
const User = require("./models/User");
const Poll = require("./models/Poll");
const getBalance = require("./users/getBalance");
const Vote = require("./models/Vote");
const Event = require("./models/Event");
const { quadritic, normal, weighted } = require("./controllers/resultFinder");

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

    myEvents: (_, __, { user }) => {},

    event: (_, { _id }, {}) => {},
  },

  Poll: {
    creator: (p) => {
      return User.methods.queries.get(p.creator);
    },
    isVoted: async (p, _, { user }) => {
      return !!(await Vote.methods.isVoted(user.id, p._id));
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

    voteWeights: async (p) => {
      const poll = await Poll.methods.get(p._id);
      const votes = await Vote.methods.getVotes(p._id);
      if (poll.structure === "token") return weighted(votes);
      if (poll.structure === "quadritic") return quadritic(votes);
      return normal(votes);
    },
  },

  Event: {
    isClaimable: async (e) => {
      const availableCode = Event.getLastAvailableCode(e._id);
      return !!availableCode;
    },
  },

  Mutation: {
    authorize: () => getAuthorizationUrl(),
    createPoll: async (_, { pollString }, { user }) => {
      const pollObject = JSON.parse(pollString);
      try {
        const poll = await Poll.methods.createPoll({ ...pollObject }, user.id);
        return poll._id;
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

    activatePoll: async (_, { pollId }, { user }) => {
      const poll = await Poll.methods.get(pollId);
      if (user.id !== poll.creator) throw new Error("Unauthorized!");
      await Poll.methods.activatePoll(pollId);
      return "Done!";
    },

    deactivePoll: async (_, { pollId }, { user }) => {
      const poll = await Poll.methods.get(pollId);
      if (user.id !== poll.creator) throw new Error("Unauthorized!");
      await Poll.methods.deactivePoll(pollId);
      return "Done!";
    },

    createEvent: (_, { title, selectedCoin, amount }, { user }) => {
      return Event.create({ title, selectedCoin, amount, owner: user._id });
    },

    addCode: async (_, { eventId, body }, { user }) => {
      const eve = await Event.get(eventId);
      if (eve.owner !== user._id) throw new Error("Unauthorized!");
      await Event.addCode({ eventId, body });
      return "Done!";
    },

    deleteCode: async (_, { codeId }, { user }) => {
      const eve = await Event.get(eventId);
      if (eve.owner !== user._id) throw new Error("Unauthorized!");
      await Event.deleteCode(codeId);
      return "Done!";
    },

    claim: async (_, { eventId }, { user }) => {
      await Event.claim(eventId, user._id);
      return "Done!";
    },
  },
};

module.exports = resolvers;
