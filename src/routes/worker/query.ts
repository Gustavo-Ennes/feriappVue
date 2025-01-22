const workerQuery = `
query WorkerQuery($_id: ID!){
  worker(_id: $_id){
    _id
    name
    registry
    matriculation
    status
    role
    admissionDate
    justification
    department{
      _id
      name
    }
  }

  vacations(fromWorker: $_id){
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
      subType    
    }
    totalPages
    pageNumber
    totalResults
    error
  }
}
`;

export { workerQuery };
