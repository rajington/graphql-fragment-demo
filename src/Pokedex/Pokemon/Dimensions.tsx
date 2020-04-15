import React from "react";

const Dimensions: React.FC<{ minimum: string; maximum: string }> = ({
  minimum,
  maximum
}) => (
  <>
    from {minimum} to {maximum}
  </>
);

export default Dimensions;
