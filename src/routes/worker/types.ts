import type { Modal } from "bootstrap";
import type { InferType } from "yup";
import type { VueElement } from "vue";

import type { workerCreateFormSchema } from "./components/WorkerModal/components/WorkerModalForm/form";
import type { ComponentProps } from "@/__VLS_types";

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
  allWorkers: Worker[] | null;
  displayWorkers: Worker[] | null;
}

interface WorkerFormDataInterface {
  searchTerm: string;
  modal?: Modal;
}

interface WorkerModalDataInterface {
  departments: { name: string; id: string }[];
  dataToSend?: WorkerModalFormDataInterface;
  errors: string[] | undefined;
  formModified: boolean;
}

interface WorkerModalFormDataInterface {
  form: WorkerCreatePayloadInterface;
}

interface WorkerCreatePayloadInterface {
  name: string;
  role: string;
  matriculation: string;
  registry: string;
  departmentId: string | null;
  admissionDate: string;
}
interface WorkerModalInterface extends WorkerModalDataInterface {
  processForm: (
    this: WorkerModalComponentInterface,
    data: WorkerModalDataInterface
  ) => Promise<void>;
  sendData: (
    this: WorkerModalComponentInterface,
    data: WorkerModalDataInterface
  ) => Promise<void>;
  type: string;
  modal: Modal;
}

type WorkerModalComponentInterface = ComponentProps<WorkerModalInterface>;

type WorkerFormType = InferType<typeof workerCreateFormSchema>;

export type {
  Worker,
  WorkerResponseInterface,
  WorkersDataInterface,
  WorkerFormDataInterface,
  WorkerModalDataInterface,
  WorkerModalFormDataInterface,
  WorkerFormType,
  WorkerCreatePayloadInterface,
  WorkerModalComponentInterface,
};
