const extraHoursQuery = `
query ExtraHours($extraHourInput: ExtraHourInput) {
  extraHours(extraHourInput: $extraHourInput) {
    _id
    worker {
      _id
      name
      justification
    }
    reference
    amount
    nightlyAmount
  }
  workers{
    _id
    name
    justification
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
