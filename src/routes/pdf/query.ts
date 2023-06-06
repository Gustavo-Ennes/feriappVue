export const vacationPdfQuery = `
  query VacationPdf($vacationId: ID!){
    vacationPdf(vacationId: $vacationId)
  }
`;

export const justificationPdfQuery = `
query JustificationPdf($workerId: ID!){
  justificationPdf(workerId: $workerId)
}
`;

export const authorizationPdfQuery = `
query AuthorizationPdf($workerId: ID!, $reference: Date!){
  authorizationPdf(workerId: $workerId, reference: $reference)
}
`;

export const reportPdfPdfQuery = `
query ReportPdf($departmentId: ID!, $reference: Date!){
  reportPdf(reference: $reference, departmentId: $departmentId)
}
`;
