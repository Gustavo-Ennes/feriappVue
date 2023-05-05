export const vacationPdfQuery = `
  query VacationPdf($_id: ID!, $type: String!){
    vacationPdf(_id: $_id, type: $type)
  }
`;
