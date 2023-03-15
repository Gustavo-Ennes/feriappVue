const vacationCreateMutation = `
mutation VacationCreate($vacationInput: VacationInput!){
  createVacation(vacationInput: $vacationInput){
    _id
    daysQtd
    deferred
    enjoyed
    type
    worker{
      _id
      name
      department{
        _id
        name
      }
    }
  }
}
`;

const vacationUpdateMutation = `
mutation VacationUpdate($vacationInput: VacationInput!){
  updateVacation(vacationInput: $vacationInput)
}
`;

const vacationDeleteMutation = `
mutation VacationDelete($_id: ID!){
  deleteVacation(_id: $_id)
}`;

export {
  vacationCreateMutation,
  vacationUpdateMutation,
  vacationDeleteMutation,
};
