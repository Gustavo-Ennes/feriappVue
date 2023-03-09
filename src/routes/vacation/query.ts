const vacationsQuery = `
query Vacations{
  vacations{
    _id
    daysQtd
    type
    workerId
    startDate
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
