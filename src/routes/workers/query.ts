const workersQuery = `
query Workers{
  workers{
    _id
    name
    registry
    matriculation
    status
    role
    admissionDate
    justification
    department{
      _id
      name
    }
  }
}
`;

export { workersQuery };
