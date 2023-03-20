const departmentQuery = `
query Department($_id: ID!){
  department(_id: $_id){
    _id
    name
  }
}
`;

const departmentsQuery = `
query Departments{
  departments{
    _id
    name
  }
}
`;

export { departmentQuery, departmentsQuery };
