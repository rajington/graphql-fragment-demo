import React from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://graphql-pokemon.now.sh"
  })
});

export default (props: any) => <ApolloProvider client={client} {...props} />;
