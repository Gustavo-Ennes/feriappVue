const vacationsQuery = `
query Vacations($type: String){
  vacations(deferred: true, type: $type){
    _id
    worker{
      _id
      role
      name
      matriculation
      department{
        _id
        name
      }
    }
    boss {
      _id
      name
      role
      isDirector
    }
    daysQtd
    type
    startDate
    endDate
    subType
    createdAt
    updatedAt
  }
}
`;
const workerByIdQuery = `
query WorkerById($_id: ID!){
  worker(_id: $_id) {
    _id
    name
  }
}
`;

const bossesQuery = `
  query Bosses {
    bosses {
      _id
      name
      role
      isDirector
      createdAt
      updatedAt
    }
  }
`;

export { vacationsQuery, workerByIdQuery, bossesQuery };
