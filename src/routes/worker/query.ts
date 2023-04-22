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
    department{
      _id
      name
    }
  }

  vacations(fromWorker: $_id){
    type
    daysQtd
    startDate
    subType
  }
}
`;

export { workerQuery };
