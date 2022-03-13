const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    createdTimestamp: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    rallyNetworkWalletIds: [String],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

const get = (id) => {
  return new Promise((resolve, reject) => {
    User.findOne({ id }, (err, user) => {
      if (err) return reject(err);
      return resolve(user);
    });
  });
};

const create = ({ id, createdTimestamp, username, rallyNetworkWalletIds }) => {
  const user = new User({
    id,
    createdTimestamp,
    username,
    rallyNetworkWalletIds,
  });

  return user.save();
};

const methods = {
  queries: {
    get,
  },
  commands: {
    create,
  },
};

module.exports = {
  collection: User,
  methods,
};
