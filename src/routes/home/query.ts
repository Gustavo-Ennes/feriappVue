const vacationsQuery = `
query Vacations{
  vacations(deferred: true){
    _id
    worker{
      _id
      role
      name
      matriculation
      status
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
export { vacationsQuery };
