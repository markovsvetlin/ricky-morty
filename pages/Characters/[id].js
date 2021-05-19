import { request, gql } from 'graphql-request';
import { URL } from '../../comps/queries';
import styled from 'styled-components';

const CharContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px 400px 0px 400px;
`;

const Detail = (characters) => {
  const [character] = characters.characters;
  console.log(character);
  return (
    <CharContainer>
      <h1>{character.name}</h1>
      <img src={character.image} alt="" />
      <h3>{character.species}</h3>
      <h3>{`Status: ${character.status}`}</h3>
    </CharContainer>
  );
};

export default Detail;
export async function getServerSidePaths() {
  const { data } = await request(
    URL,
    gql`
      query {
        characters {
          results {
            name
          }
        }
      }
    `
  );
  const paths = data.characters.results.map((result) => {
    return {
      params: { id: result.name },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export const getServerSideProps = async (context) => {
  const name = context.params.id;
  const data = await request(
    URL,
    gql`
      query  {
        characters(filter:{name:"${name}"}) {
          info {
            pages
            count
            next
            prev
          }
          results {
            name
            id
            image
            status
            species
          }
        }
      }
    `
  );
  return {
    props: { characters: data.characters.results, info: data.characters.info },
  };
};
