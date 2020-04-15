import React from "react";

const Pokemon: React.FC<{ minimum: string; maximum: string }> = ({
  minimum,
  maximum
}) => (
  <>
    from {minimum} to {maximum}
  </>
);

export default Pokemon;
