const createDepartmentMutation = `
mutation CreateDepartment($departmentInput: DepartmentInput!){
  createDepartment(departmentInput: $departmentInput){
    _id
    name
    responsible
  }
}
`;

const updateDepartmentMutation = `
mutation UpdateDepartment($departmentInput: DepartmentInput!){
  updateDepartment(departmentInput: $departmentInput)
}
`;

const deleteDepartmentMutation = `
mutation DeleteDepartment($_id: ID!){
  deleteDepartment(_id: $_id)
}
`;

export {
  createDepartmentMutation,
  updateDepartmentMutation,
  deleteDepartmentMutation
};
