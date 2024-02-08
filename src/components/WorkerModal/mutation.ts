const createWorkerMutation: string = `
mutation CreateWorkers($workerInput: WorkerInput){
  createWorker (workerInput: $workerInput){
    _id
    name
    role
    registry
    matriculation
    justification
  }
}
`;

const updateWorkerMutation: string = `
mutation UpdateWorker($workerInput: WorkerInput){
  updateWorker (workerInput: $workerInput)
}
`;

export { createWorkerMutation, updateWorkerMutation };
