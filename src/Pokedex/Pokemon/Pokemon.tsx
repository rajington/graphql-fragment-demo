import React from "react";
import { gql, useQuery } from "@apollo/client";
import Title, { fragment as TitleFragment } from "./Title";
import Dimensions, { fragment as DimensionsFragment } from "./Dimensions";
import SpecialAttack, {
  fragment as SpecialAttackFragment
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

  const {
    height,
    weight,
    attacks: { special: specialAttacks }
  } = data.pokemon;

  return (
    <dl>
      <dt>Name (#)</dt>
      <dd>
        <Title {...data.pokemon} />
      </dd>

      <dt>height</dt>
      <dd>
        <Dimensions {...height} />
      </dd>

      <dt>weight</dt>
      <dd>
        <Dimensions {...weight} />
      </dd>

      <dt>special attacks:</dt>
      <dd>
        <ul>
          {specialAttacks.map((specialAttack: any) => (
            <li key={specialAttack.name}>
              <SpecialAttack {...specialAttack} />
            </li>
          ))}
        </ul>
      </dd>
    </dl>
  );
};

export default Pokemon;
