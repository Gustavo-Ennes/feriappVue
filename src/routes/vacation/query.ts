const vacationsQuery = `
query Vacations($type: String, $page: Int, $period: String){
  vacations(deferred: true, type: $type, page: $page, period: $period){
    items {
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
      observation
      createdAt
      updatedAt
    }
    totalPages
    pageNumber
    totalResults
    error
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
  query Bosses($onlyDirectors: Boolean) {
    bosses(onlyDirectors: $onlyDirectors) {
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
