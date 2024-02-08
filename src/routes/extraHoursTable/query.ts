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
    department {
      _id
      name
    }
  }
  workers{
    _id
    name
    department {
      _id
      name      
    }
  }
  departments {
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
`;

export { extraHoursQuery, referenceQuery };
