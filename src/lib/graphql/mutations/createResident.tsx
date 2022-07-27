import gql from 'graphql-tag';

const CREATE_RESIDENTS = gql`
mutation createResident($name: String!, $firstName: String!, $lastName: String!, $room: String!, $birthDate: DateTime!, $moveInDate: DateTime!, $ambulation: Ambulation, $levelOfCare: LevelOfCare) {
  createResident(input: {name: $name, firstName: $firstName, lastName: $lastName, room: $room, birthDate: $birthDate, moveInDate: $moveInDate, ambulation: $ambulation, levelOfCare: $levelOfCare}) {
    name
    firstName
    lastName
    room
    birthDate
    moveInDate
    ambulation,
    levelOfCare
  }
}
`

export default CREATE_RESIDENTS;
