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
    departmentId
  }
}
`;

const departmentQuery: string = `
query Departments{
  departments{
    _id
    name
  }
}
`;

export { workersQuery, departmentQuery };
