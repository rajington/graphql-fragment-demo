import * as React from "react";
import ApolloProvider from "./ApolloProvider";
import Pokedex from "./Pokedex";

export default () => (
  <ApolloProvider>
    <Pokedex />
  </ApolloProvider>
);
