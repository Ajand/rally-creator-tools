const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema(
  {
    voter: {
      type: String,
      required: true,
    },
    pollId: {
      type: String,
      required: true,
    },
    option: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model("vote", VoteSchema);

const create = async ({ voter, pollId, option, weight }) => {
  const isV = await isVoted();
  if (!isV) {
    const vote = new Vote({ voter, pollId, option, weight });
    return vote.save();
  } else {
    return isV;
  }
};

const isVoted = (voter, pollId) => {
  return new Promise((resolve, reject) => {
    Vote.findOne({ voter, pollId }, (err, vote) => {
      if (err) return reject(err);

      if (vote) return resolve(vote);
      return resolve(false);
    });
  });
};

const getVotes = (pollId) => {
  return new Promise((resolve, reject) => {
    Vote.find({ pollId }, (err, votes) => {
      if (err) return reject(err);
      return resolve(votes);
    });
  });
};

module.exports = {
  collection: Vote,
  methods: {
    create,
    isVoted,
    getVotes,
  },
};
