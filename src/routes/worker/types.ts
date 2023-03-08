import type { Modal, Toast } from "bootstrap";
import type { InferType } from "yup";

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
  modal?: Modal;
  modalType?: string;
  selectedWorker: Worker | undefined;
  departments?: Department[];
}

interface Department {
  _id: string;
  name: string;
}

interface WorkerFormDataInterface {
  searchTerm: string;
}

interface WorkerModalDataInterface {
  departments: { name: string; id: string }[];
  dataToSend?: WorkerModalFormDataInterface;
  errors: string[] | undefined;
  formModified: boolean;
  toastPayload:
    | {
        text?: string;
        title?: string;
        type?: string;
      }
    | undefined;
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
  _id?: string;
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

interface WorkerTableDataInterface {
  confirmationModal?: Modal;
}

interface DepartmentResponseInterface {
  data?: {
    departments?: Department[];
  };
  errors?: any;
}

interface TranslatedStatusObject {
  active: string;
  license: string;
  dayOff: string;
  vacation: string;
}

type WorkerModalComponentInterface = ComponentProps<WorkerModalInterface>;

type WorkerFormType = InferType<typeof workerCreateFormSchema>;

export type {
  Worker,
  Department,
  WorkerResponseInterface,
  WorkersDataInterface,
  WorkerFormDataInterface,
  WorkerModalDataInterface,
  WorkerModalFormDataInterface,
  WorkerFormType,
  WorkerCreatePayloadInterface,
  WorkerModalComponentInterface,
  WorkerTableDataInterface,
  DepartmentResponseInterface,
  TranslatedStatusObject,
};
