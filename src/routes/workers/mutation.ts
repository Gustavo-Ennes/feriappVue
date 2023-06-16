const deleteWorkerMutation: string = `
mutation DeleteWorker($_id: ID!){
  deleteWorker(_id: $_id)
}
`;

export { deleteWorkerMutation };
