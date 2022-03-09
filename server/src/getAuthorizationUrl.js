const axios = require("axios");
const getRegisterToken = require("./getRegisterToken");
const { callback_url } = require("../config");

const getAuthorizationUrl = async () => {
  const registerToken = await getRegisterToken();

  const authHeader = `Bearer ${registerToken}`;

  console.log(authHeader);

  const data = JSON.stringify({
    callback: callback_url,
  });

  var config = {
    method: "post",
    url: "https://api.rally.io/v1/oauth/authorize",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        return resolve(response.data.url);
      })
      .catch(function (error) {
        return reject(error);
      });
  });
};

module.exports = getAuthorizationUrl;
