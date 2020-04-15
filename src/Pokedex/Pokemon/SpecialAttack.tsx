import React from "react";
import { gql } from "@apollo/client";

export const fragment = gql`
  fragment SpecialAttack on Attack {
    name
    type
  }
`;

const SpecialAttack: React.FC<{ name: string; type: string }> = ({
  name,
  type
}) => (
  <>
    {name} ({type})
  </>
);

export default SpecialAttack;
