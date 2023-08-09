
const processExtraHoursMutation = `
mutation ($extraHourInput: [ExtraHourInput]!) {
  processExtraHours(extraHourInput: $extraHourInput){
    created
    updated
    deleted
  }
}`;

export {
  processExtraHoursMutation
};
