import { request, gql } from 'graphql-request';
import { useState } from 'react';
import styled from 'styled-components';

const CharsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  margin: 50px;
`;

const Title = styled.h1`
  text-align: center;
  margin: 100px 0px;
`;

const EpisodeInfo = styled.div`
  margin-top: 100px;
`;

const Detail = (episodes) => {
  const [episode] = episodes.episodes;
  const [limit, setLimit] = useState(10);
  console.log(episodes);
  const loadMore = () => {
    setLimit((prev) => prev + 10);
  };

  return (
    <EpisodeInfo>
      <Title>{episode.name}</Title>
      <Title>{episode.air_date}</Title>
      <Title>Characters</Title>
      <CharsContainer>
        {episode.characters.map((character, index) => {
          return index < limit ? (
            <div key={index}>
              <h3>{character.name}</h3>
              <img src={character.image} alt="" />
            </div>
          ) : null;
        })}
      </CharsContainer>
      <button onClick={loadMore}>load more</button>
    </EpisodeInfo>
  );
};

export default Detail;
export async function getServerSidePaths() {
  const { data } = await request(
    'https://rickandmortyapi.com/graphql/',
    gql`
      query {
        episodes {
          results {
            name
          }
        }
      }
    `
  );
  console.log(data);
  const paths = data.episodes.results.map((result) => {
    return {
      params: { id: result.name },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getServerSideProps(context) {
  const name = context.params.id;
  const data = await request(
    'https://rickandmortyapi.com/graphql/',
    gql`
      query {
        episodes(filter:{name:"${name}"}) {
          info {
            pages
            count
          }
          results {
            name
            air_date
            id
            characters {
              name
              image
            }
          }
        }
      }
    `
  );

  return {
    props: {
      episodes: data.episodes.results,
    },
  };
}
