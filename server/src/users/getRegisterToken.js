const { username, password } = require("../config");
const axios = require("axios");

let registerToken;
let registerTokenAt;

const getRegisterToken = () => {
  return new Promise((resolve, reject) => {
    if (registerTokenAt && new Date() - registerTokenAt < 30 * 60 * 1000) {
      return resolve(registerToken);
    } else {
      var data = JSON.stringify({
        password,
        username,
      });

      axios({
        method: "post",
        url: `https://api.rally.io/v1/oauth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
        .then(({ data }) => {
          console.log("Getted new register token ...");
          registerToken = data.access_token;
          registerTokenAt = new Date();
          resolve(data.access_token);
        })
        .catch((err) => {
          return reject(err);
        });
    }
  });
};

module.exports = getRegisterToken;
