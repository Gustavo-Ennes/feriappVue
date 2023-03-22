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
`

export { vacationsQuery, workerByIdQuery };
