import type { Modal } from "bootstrap";
import type { InferType } from "yup";
import type { PropType } from "vue";

import type { workerCreateFormSchema } from "./components/WorkerModal/components/WorkerModalForm/form";

interface Worker {
  _id?: string;
  name: string;
  admissionDate: string;
  role: string;
  status: string;
  department: { _id: string; name: string };
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
  workers?: Worker[];
  filteredWorkers?: Worker[];
  modal?: Modal;
  confirmationModal?: Modal;
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
  departmentId?: string | null;
  department?: string | null;
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

type WorkerModalComponentInterface = PropType<WorkerModalInterface>;
type WorkerFormType = InferType<typeof workerCreateFormSchema>;
type VacationType = "dayOff" | "vacation" | "license";

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
  VacationType,
};
