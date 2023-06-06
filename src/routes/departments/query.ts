const departmentQuery = `
query Department($_id: ID!){
  department(_id: $_id){
    _id
    name
    responsible
  }
}
`;

const departmentsQuery = `
query Departments{
  departments{
    _id
    name
    responsible
  }
}
`;

export { departmentQuery, departmentsQuery };
