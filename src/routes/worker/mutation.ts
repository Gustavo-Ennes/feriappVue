const createWorkerMutation: string = `
mutation CreateWorkers($workerInput: WorkerInput){
  createWorker (workerInput: $workerInput){
    _id
    name
    role
    registry
    matriculation
    
  }
}
`;

const updateWorkerMutation: string = `
mutation UpdateWorker($workerInput: WorkerInput){
  updateWorker (workerInput: $workerInput)
}
`;
const deleteWorkerMutation: string = `
mutation DeleteWorker($_id: ID!){
  deleteWorker(_id: $_id)
}
`;

export { createWorkerMutation, updateWorkerMutation, deleteWorkerMutation };
