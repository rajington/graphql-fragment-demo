import React from "react";
import { gql, useQuery } from "@apollo/client";
import Title, { fragment as TitleFragment } from "./Title";
import Dimensions, { fragment as DimensionsFragment } from "./Dimensions";
import SpecialAttack, {
  fragment as SpecialAttackFragment,
} from "./SpecialAttack";

const POKEMON_QUERY = gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      ...Title
      height {
        ...Dimensions
      }
      weight {
        ...Dimensions
      }
      attacks {
        special {
          name # key
          ...SpecialAttack
        }
      }
    }
  }

  ${TitleFragment}
  ${DimensionsFragment}
  ${SpecialAttackFragment}
`;

const Pokemon: React.FC<{ name: string }> = ({ name }) => {
  const { data } = useQuery(POKEMON_QUERY, { variables: { name } });

  if (!data) {
    return null;
  }

  return (
    <dl>
      <dt>Name (#)</dt>
      <dd>
        <Title name={data.pokemon.name} number={data.pokemon.number} />
      </dd>

      <dt>height</dt>
      <dd>
        <Dimensions
          minimum={data.pokemon.height.minimum}
          maximum={data.pokemon.height.maximum}
        />
      </dd>

      <dt>weight</dt>
      <dd>
        <Dimensions
          minimum={data.pokemon.weight.minimum}
          maximum={data.pokemon.weight.maximum}
        />
      </dd>

      <dt>special attacks:</dt>
      <dd>
        <ul>
          {data.pokemon.attacks.special.map((specialAttack: any) => (
            <li key={specialAttack.name}>
              <SpecialAttack
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
