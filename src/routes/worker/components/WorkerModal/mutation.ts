const createWorkerMutation: string = `
mutation CreateWorkers($workerInput: WorkerCreateInput){
  createWorker (workerInput: $workerInput){
    id
    name
    role
    registry
    matriculation
    
  }
}
`;

export { createWorkerMutation };
