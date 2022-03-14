const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const getRegiseterToken = require("./src/getRegisterToken");
const { port, dbString, clientUrl, jwtSecret } = require("./config");
const typeDefs = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const getUserInfo = require("./src/users/getUserInfo");
const getAccount = require("./src/users/getAccount");
const mongoose = require("mongoose");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const getBalance = require("./src/users/getBalance");

const {
  getAllCreatorCoins,
  creatorCoins,
} = require("./src/getAllCreatorCoins");

getAllCreatorCoins()
  .then((r) => {})
  .catch((err) => {
    console.log(err);
  });
/*setInterval(() => {
  getAllCreatorCoins()
    .then((r) => console.log(r))
    .catch((err) => {
      console.log(err);
    });
}, 60 * 1000);*/

getBalance("cc3d5aec-651e-11ec-8847-0a847b2a60cc", "ADHD")
  .then((r) => console.log(r))
  .catch((err) => console.log(err));

const User = require("./src/models/User");

mongoose.connect(dbString);

//wgetRegiseterToken()
//  .then((rt) => console.log(rt))
//  .catch((err) => console.log(err));

const app = express();

//require('./oauth')

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors());

  const httpServer = http.createServer(app);

  app.get("/creator-coins", (req, res) => {
    getAllCreatorCoins()
      .then((r) => res.send(r))
      .catch((err) => {
        res.next(err);
      });
  });

  app.get("/rally-oauth", async (req, res) => {
    const userInfo = await getUserInfo(req.query.code);

    const userAccounts = await getAccount(userInfo.rnbUserId);

    const user = await User.methods.queries.get(userAccounts[0].id);

    if (user) {
      const token = jwt.sign({ id: user.id }, jwtSecret);

      res.redirect(`${clientUrl}/oauth/${token}`);
    } else {
      const usr = await User.methods.commands.create(
        userAccounts[0],
        userInfo.rnbUserId
      );

      const token = jwt.sign({ id: usr.id }, jwtSecret);

      res.redirect(`${clientUrl}/oauth/${token}`);
    }
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      if (token) {
        try {
          const decode = jwt.verify(token, jwtSecret);
          const user = await User.methods.queries.get(decode.id);
          return { user };
        } catch (err) {
          return {};
        }
      }
      return {};
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
