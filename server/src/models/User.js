const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

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
    username: {
      type: String,
      required: true,
    },
    rnbUserId: {
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
    if (ObjectId.isValid(id)) {
      User.findOne({ _id: id }, (err, user) => {
        if (err) return reject(err);

        return resolve(user);
      });
    } else {
      User.findOne({ id }, (err, user) => {
        if (err) return reject(err);
        return resolve(user);
      });
    }
  });
};

const create = (
  { id, createdTimestamp, username, rallyNetworkWalletIds },
  rnbUserId
) => {
  const user = new User({
    id,
    createdTimestamp,
    username,
    rallyNetworkWalletIds,
    rnbUserId,
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
