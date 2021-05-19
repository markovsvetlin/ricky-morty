import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { request } from 'graphql-request';
import styled from 'styled-components';
import { QUERY_EPISODES, URL } from '../../comps/queries';

const EpisodesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  margin: 50px;
`;

const EpisodeContiner = styled.div`
  border: 1px solid black;
  padding: 20px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
const Title = styled.h1`
  text-align: center;
  margin-top: 100px;
`;
const Episodes = ({ episodes, info }) => {
  const router = useRouter();
  const root = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesArr, setEpisodesArr] = useState(episodes);

  const fetchMore = async () => {
    const data = await request(URL, QUERY_EPISODES, {
      page: currentPage,
    });
    console.log(data);
    setEpisodesArr([...episodesArr, ...data.episodes.results]);

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
      <Title>EPISODES</Title>
      <EpisodesContainer>
        {episodesArr.map((episode, index) => (
          <EpisodeContiner key={index}>
            <h1>{episode.name}</h1>
            <h3>{`Air Date: ${episode.air_date}`}</h3>
            <h3>{`Characters involved: ${episode.characters.length}`}</h3>
            <DetailButton
              onClick={() => router.push(`/Episodes/${episode.name}`)}
            >
              Detail
            </DetailButton>
          </EpisodeContiner>
        ))}
      </EpisodesContainer>
      <div ref={root} style={{ minHeight: `10px`, minWidth: `10px` }}></div>
    </>
  );
};
export default Episodes;
export const getServerSideProps = async () => {
  const data = await request(URL, QUERY_EPISODES, {
    page: 1,
  });
  return {
    props: { episodes: data.episodes.results, info: data.episodes.info },
  };
};
