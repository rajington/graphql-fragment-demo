import React from "react";
import { gql, useQuery } from "@apollo/client";
import { filter } from "graphql-anywhere";
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
        <Title {...filter(TitleFragment, data.pokemon)} />
      </dd>

      <dt>height</dt>
      <dd>
        <Dimensions {...filter(DimensionsFragment, data.pokemon.height)} />
      </dd>

      <dt>weight</dt>
      <dd>
        <Dimensions {...filter(DimensionsFragment, data.pokemon.weight)} />
      </dd>

      <dt>special attacks:</dt>
      <dd>
        <ul>
          {data.pokemon.attacks.special.map((specialAttack: any) => (
            <li key={specialAttack.name}>
              <SpecialAttack
                {...filter(SpecialAttackFragment, specialAttack)}
              />
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  );
};

export default Pokemon;
