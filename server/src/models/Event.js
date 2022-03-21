const mongoose = require("mongoose");

const CodeSchema = mongoose.Schema(
  {
    eventId: { type: String, required: true },
    claimed: {
      type: Boolean,
      default: false,
    },
    claimedBy: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    selectedCoin: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", EventSchema);
const Code = mongoose.model("code", CodeSchema);

const get = (_id) => {
  return new Promise((resolve, reject) => {
    Event.findOne({ _id }, (err, ev) => {
      if (err) return reject(err);
      return resolve(ev);
    });
  });
};

const getUserEvents = (userId) => {
  return new Promise((resolve, reject) => {
    Event.find({ owner: userId }, (err, ev) => {
      if (err) return reject(err);
      return resolve(ev);
    });
  });
};

const create = ({ title, selectedCoin, amount, owner }) => {
  const ev = new Event({
    title,
    selectedCoin,
    amount,
    owner,
  });

  return ev.save();
};

const addCode = (eventId, body) => {
  return new Promise((resolve, reject) => {
    const code = new Code({
      eventId,
      body,
    });

    return code.save();
  });
};

const getCodesOfEvent = (eventId) => {
  return new Promise((resolve, reject) => {
    Code.find({ eventId }, (err, ev) => {
      if (err) return reject(err);
      return resolve(ev);
    });
  });
};

const getLastAvailableCode = (eventId) => {
  return new Promise((resolve, reject) => {
    Code.findOne({ eventId, claimed: false }, (err, ev) => {
      if (err) return reject(err);
      return resolve(ev);
    });
  });
};

const getCode = (_id) => {
  return new Promise((resolve, reject) => {
    Code.findOne({ _id }, (err, ev) => {
      if (err) return reject(err);
      return resolve(ev);
    });
  });
};

const isClaimed = (codeId) => {
  return new Promise((resolve, reject) => {
    Code.findOne({ _id: codeId, claimed: false }, (err, ev) => {
      if (err) return reject(err);
      return resolve(ev);
    });
  });
};

const deleteCode = (codeId) => {
  return new Promise(async (resolve, reject) => {
    const cd = await getCode(codeId);
    if (cd.claimed)
      return reject(new Error("Can not delete a code that is already claimed"));
    Code.findOne({ _id: codeId, claimed: false }, (err, ev) => {
      if (err) return reject(err);
      return resolve(ev);
    });
  });
};

const claim = (eventId, claimer) => {
  return new Promise(async (resolve, reject) => {
    const code = await getLastAvailableCode(eventId);
    if (!code) return reject(new Error("No code is available."));
    Code.updateOne(
      { _id: code._id },
      {
        $set: {
          claimed: true,
          claimer,
        },
      },
      (err, ev) => {
        if (err) return reject(err);
        return resolve(getLastAvailableCode(eventId));
      }
    );
  });
};

module.exports = {
  get,
  getUserEvents,
  create,
  addCode,
  getCodesOfEvent,
  getLastAvailableCode,
  isClaimed,
  deleteCode,
  claim,
};
