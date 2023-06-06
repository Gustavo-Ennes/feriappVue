const createExtraHourMutation = `
mutation ($extraHourInput: ExtraHourInput!) {
  createExtraHour(extraHourInput: $extraHourInput) {
    _id
    worker {
      _id
      name
    }
    reference
    amount
    nightlyAmount
  }
}
`;

const updateExtraHourMutation = `
mutation ($extraHourInput: ExtraHourInput!) {
  updateExtraHour(extraHourInput: $extraHourInput)
}`;

const deleteExtraHourMutation = `
mutation ($id: ID!) {
  deleteExtraHour(_id: $id)
}`;

export {
  createExtraHourMutation,
  deleteExtraHourMutation,
  updateExtraHourMutation,
};
