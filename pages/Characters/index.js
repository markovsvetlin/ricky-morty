import { useState, useEffect, useRef } from 'react';
import { request, gql } from 'graphql-request';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { QUERY_CHARACTERS } from '../../comps/queries';

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
  padding-bottom: 20px;
  transition: all 0.7s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const DetailButton = styled.button`
  font-size: 26px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const Characters = ({ characters, info }) => {
  const root = useRef();
  const [charactersArr, setCharactersArr] = useState(characters);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  console.log(info);

  const fetchMore = async () => {
    const data = await request(
      'https://rickandmortyapi.com/graphql/',
      QUERY_CHARACTERS,
      {
        page: currentPage,
      }
    );
    console.log(data);
    setCharactersArr([...charactersArr, ...data.characters.results]);

    return {
      data,
    };
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, { threshold: 0 });
    observer.observe(root.current);
    function onIntersection(entries) {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        if (currentPage < info.pages) {
          setCurrentPage((prev) => prev + 1);
        } else {
          observer.disconnect();
        }
      }
    }
  }, []);
  useEffect(() => {
    if (1 !== currentPage && currentPage <= info.pages) {
      console.log(`keeps on fetching`, currentPage);
      fetchMore();
    }
  }, [currentPage]);
  return (
    <>
      <CharsContainer>
        {charactersArr.map((character, index) => (
          <CharContainer>
            <h2>{character.name}</h2>
            <img src={character.image} alt="bla" />
            <h4>{character.species}</h4>
            <h4>{`Status: ${character.status}`}</h4>
            <DetailButton
              onClick={() => router.push(`/Characters/${character.name}`)}
            >
              Details
            </DetailButton>
          </CharContainer>
        ))}
      </CharsContainer>

      <div ref={root}>sssss</div>
    </>
  );
};

export default Characters;
export const getServerSideProps = async () => {
  const data = await request(
    'https://rickandmortyapi.com/graphql/',
    QUERY_CHARACTERS,
    {
      page: 1,
    }
  );
  return {
    props: { characters: data.characters.results, info: data.characters.info },
  };
};
