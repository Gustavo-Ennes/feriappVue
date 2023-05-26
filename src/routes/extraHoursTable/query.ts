const extraHoursQuery = `
query ExtraHours($extraHourInput: ExtraHourInput) {
  extraHours(extraHourInput: $extraHourInput) {
    _id
    worker {
      _id
      name
    }
    reference
    amount
  }
  workers{
    _id
    name
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
