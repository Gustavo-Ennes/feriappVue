import type { Worker } from "../workers/types";
import type { Vacation } from "../vacation/types";
import type { Modal } from "bootstrap";

type WorkerDataType = {
  worker?: Worker;
  workerVacations?: Vacation[];
  modal?: Modal;
};

export type { WorkerDataType };
