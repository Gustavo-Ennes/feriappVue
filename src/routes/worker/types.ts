import type { Worker } from "../workers/types";
import type { Vacation } from "../vacation/types";

type WorkerDataType = { worker?: Worker; workerVacations?: Vacation[] };

export type { WorkerDataType };
