import gql from 'graphql-tag';

const GET_PROGRAMS = gql`
query getPrograms {
  programs {
    id
    name
    location
    start
    end
  }
}
`

export default GET_PROGRAMS;
