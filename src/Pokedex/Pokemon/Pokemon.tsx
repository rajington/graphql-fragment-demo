import React from "react";
import { gql, useQuery } from "@apollo/client";
import Dimensions from "./Dimensions";
import SpecialAttack from "./SpecialAttack";

const POKEMON_QUERY = gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      number
      height {
        minimum
        maximum
      }
      weight {
        minimum
        maximum
      }
      attacks {
        special {
          name
          type
        }
      }
    }
  }
`;

const Pokemon: React.FC<{ name: string }> = ({ name }) => {
  const { data } = useQuery(POKEMON_QUERY, { variables: { name } });

  if (!data) {
    return null;
  }

  const {
    number,
    height,
    weight,
    attacks: { special: specialAttacks }
  } = data.pokemon;

  return (
    <dl>
      <dt>Name (#)</dt>
      <dd>
        {name} (# {number})
      </dd>

      <dt>height</dt>
      <dd>
        <Dimensions minimum={height.minimum} maximum={height.maximum} />
      </dd>

      <dt>weight</dt>
      <dd>
        <Dimensions minimum={weight.minimum} maximum={weight.maximum} />
      </dd>

      <dt>special attacks:</dt>
      <dd>
        <ul>
          {specialAttacks.map((specialAttack: any) => (
            <li>
              <SpecialAttack
                key={specialAttack.name}
                name={specialAttack.name}
                type={specialAttack.type}
              />
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  );
};

export default Pokemon;
