import React from "react";
import { gql } from "@apollo/client";

export const fragment = gql`
  fragment Title on Pokemon {
    name
    number
  }
`;

const Title: React.FC<{ name: string; number: string }> = ({
  name,
  number
}) => (
  <>
    {name} (# {number})
  </>
);

export default Title;
