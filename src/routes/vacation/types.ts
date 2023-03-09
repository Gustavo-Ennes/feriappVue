import type { Worker } from "../worker/types";

interface Vacation {
  _id: string;
  daysQtd: number;
  endDate?: string;
  startDate: string;
  workerId: string;
  deferred?: boolean;
  observation?: string;
  enjoyed?: boolean;
  type: string;
}

interface VacationFetchInterface {
  data: {
    vacations?: Vacation[];
  };
  errors?: any;
}

interface WorkerFetchInterface {
  data: {
    worker?: Worker;
  };
  errors?: any;
}

interface VacationDataInterface {
  vacations?: Vacation[];
}

export type {
  Vacation,
  VacationDataInterface,
  VacationFetchInterface,
  WorkerFetchInterface,
};
