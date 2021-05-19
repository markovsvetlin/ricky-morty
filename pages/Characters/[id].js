import { request, gql } from 'graphql-request';

const Detail = (characters) => {
  const [character] = characters.characters;

  return (
    <div>
      <h3>{character.name}</h3>
      <img src={character.image} alt="" />
    </div>
  );
};

export default Detail;
export async function getServerSidePaths() {
  const { data } = await request(
    'https://rickandmortyapi.com/graphql/',
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
    'https://rickandmortyapi.com/graphql/',
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
