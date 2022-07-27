import gql from 'graphql-tag';

const SET_ATTENDANCE = gql`
mutation setAttendance($residentId: ID!, $programId: ID!, $status: EnumStatus!) {
  setAttendance(input: {residentId: $residentId, programId: $programId, status: $status}) {
    programId
    residentId
  }
}
`

export default SET_ATTENDANCE;
