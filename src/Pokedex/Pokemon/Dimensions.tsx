import React from "react";
import { gql } from "@apollo/client";

export const fragment = gql`
  fragment Dimensions on PokemonDimension {
    minimum
    maximum
  }
`;

const Dimensions: React.FC<{ minimum: string; maximum: string }> = ({
  minimum,
  maximum
}) => (
  <>
    from {minimum} to {maximum}
  </>
);

export default Dimensions;
