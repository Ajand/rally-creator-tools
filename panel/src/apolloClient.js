import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL,
  cache: new InMemoryCache(),
});

export default client;
