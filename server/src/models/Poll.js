const mongoose = require("mongoose");

const PollSchema = new mongoose.Schema(
  {
    basics: {
      question: {
        type: String,
        required: true,
      },
      variant: {
        type: String,
        required: true,
      },
      options: [
        {
          body: {
            type: String,
          },
          hash: {
            type: String,
          },
        },
      ],
    },
    styles: {
      questionFontFamily: String,
      questionFontVariant: String,
      questionFontSize: Number,
      questionFontStyle: String,
      backgroundColor: String,
      optionBackgroundColor: String,
      questionColor: String,
      optionTextColor: String,
      optionFontFamily: String,
      optionFontVariant: String,
      optionFontSize: Number,
      optionFontStyle: String,
    },
    structure: String,
    token: String,
    showVotes: Boolean,
    creator: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Poll = mongoose.model("Poll", PollSchema);

const createPoll = (
  { basics, styles, structure, token, showVotes },
  userId
) => {
  const poll = new Poll({
    basics,
    styles,
    structure,
    token,
    showVotes,
    creator: userId,
  });

  return poll.save();
};

const get = (_id) => {
  return new Promise((resolve, reject) => {
    Poll.findOne({ _id }, (err, poll) => {
      if (err) return reject(err);
      return resolve(poll);
    });
  });
};

const methods = {
  createPoll,
  get,
};

module.exports = {
  collection: Poll,
  methods,
};
