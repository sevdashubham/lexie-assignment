import gql from 'graphql-tag';

const GET_RESIDENTS = gql`
query getResidents {
  residents {
    id
    name
    room
    moveInDate
  }
}
`

export default GET_RESIDENTS;
