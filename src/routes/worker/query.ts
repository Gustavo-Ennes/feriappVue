const workersQuery = `
query Workers{
  workers{
    id
    name
    registry
    matriculation
    status
    role
    admissionDate
    departmentId
  }
}
`;

export { workersQuery };
