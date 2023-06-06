const extraHoursQuery = `
query ExtraHours($extraHourInput: ExtraHourInput) {
  extraHours(extraHourInput: $extraHourInput) {
    _id
    worker {
      _id
      name
      department {
        _id
        name      
      }
    }
    reference
    amount
    nightlyAmount
  }
  workers{
    _id
    name
    department {
      _id
      name      
    }
  }
}
`;

const referenceQuery = `
query ReferenceExtraHourQuery{
  extraHours{
    reference
  }
}
`

export { extraHoursQuery, referenceQuery };
