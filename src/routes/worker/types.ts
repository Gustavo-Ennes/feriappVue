interface Worker {
  name: string;
  admissionDate: string;
  role: string;
  status: string;
  departmentId: string;
  registry: string;
  matriculation: string;
}

interface WorkerResponseInterface {
  data?: {
    workers?: Worker[];
  };
  errors?: any;
}

interface WorkersDataInterface {
  allWorkers: Worker[] | null
  displayWorkers: Worker[] | null;
}

interface WorkerFormDataInterface {
  searchTerm: string;
}

export type {
  Worker,
  WorkerResponseInterface,
  WorkersDataInterface,
  WorkerFormDataInterface,
};
