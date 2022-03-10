const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const getRegiseterToken = require("./src/getRegisterToken");
const { port } = require("./config");
const typeDefs = require("./src/typeDefs");
const resolvers = require("./src/resolvers");
const getUserInfo = require("./src/getUserInfo");

//wgetRegiseterToken()
//  .then((rt) => console.log(rt))
//  .catch((err) => console.log(err));

const app = express();

//require('./oauth')

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  app.get("/rally-oauth", async (req, res) => {
    console.log(req.params, req.query);
    const userInfo = await getUserInfo(req.query.code);
    res.send(userInfo);
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
