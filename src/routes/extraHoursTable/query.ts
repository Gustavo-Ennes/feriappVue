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

export { extraHoursQuery };
