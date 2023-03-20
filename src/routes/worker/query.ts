const workerByIdQuery = `
query WorkerById($_id: ID!){
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
}
`;

export { workerByIdQuery };
