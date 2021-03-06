import Head from 'next/head';
import { request } from 'graphql-request';
import styled from 'styled-components';
import { QUERY, URL } from '../comps/queries';

const CharsContainer = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  margin: 50px;
`;

const CharContainer = styled.div`
  margin-bottom: 50px;
  text-align: center;
  border: 1px solid black;
`;
export default function Home(results) {
  const charsArr = results.characters;
  return (
    <div>
      <Head>
        <title>Ricky and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CharsContainer>
        {charsArr &&
          charsArr
            .slice(0, 20)
            .sort(() => Math.random() - Math.random())
            .slice(0, 10)
            .map((char, index, array) => (
              <CharContainer>
                <h2>{char.name}</h2>
                <img src={char.image} alt="" />
                <h4>{`Status: ${char.status}`}</h4>
                <h4>{`Location: ${char.location.name}`}</h4>
              </CharContainer>
            ))}
      </CharsContainer>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await request(URL, QUERY, {
    page: 1,
  });
  return {
    props: { characters: data.characters.results, info: data.characters.info },
  };
};
