import React from "react";

const SpecialAttack: React.FC<{ name: string; type: string }> = ({
  name,
  type
}) => (
  <>
    {name} ({type})
  </>
);

export default SpecialAttack;
