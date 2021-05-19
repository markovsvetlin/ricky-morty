import { gql } from 'graphql-request';

export const QUERY = gql`
  query ($page: Int) {
    characters(page: $page) {
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
        location {
          name
        }
      }
    }
  }
`;

export const QUERY_EPISODES = gql`
  query ($page: Int) {
    episodes(page: $page) {
      info {
        pages
        count
        next
        prev
      }
      results {
        name
        air_date
        id
        characters {
          name
        }
      }
    }
  }
`;
export const QUERY_CHARACTERS = gql`
  query ($page: Int) {
    characters(page: $page) {
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
`;

export const URL = 'https://rickandmortyapi.com/graphql/';
