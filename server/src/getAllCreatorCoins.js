const { username, password } = require("../config");
const axios = require("axios");

let creatorCoins = [];
let registerTokenAt;

const getAllCreatorCoins = (startKey, r) => {
  const waitTill = (t) => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, t);
    });
  };

  return new Promise((resolve, reject) => {
    if (registerTokenAt && new Date() - registerTokenAt < 60 * 1000) {
      return resolve(creatorCoins);
    } else {
      if (!r) {
        creatorCoins = [];
      }

      axios({
        method: "get",
        url: `https://api.rally.io/api/creator-coins?size=50&${
          startKey ? `startKey=${startKey}` : ""
        }`,
        headers: {},
      })
        .then((r) => {
          const { data } = r;
          // console.log(r.headers);
          if (
            creatorCoins.find(
              (r) => r.symbol === data[data.length - 1]["symbol"]
            )
          ) {
            registerTokenAt= new Date()
            return resolve(creatorCoins);
          } else {
            creatorCoins.push(...data);

            waitTill(100);
            return resolve(
              getAllCreatorCoins(r.headers["last-evaluated-key"], true)
            );
          }
        })
        .catch((err) => {
          console.log(err);
          return reject(err);
        });
    }
  });
};

module.exports = { getAllCreatorCoins, creatorCoins };
