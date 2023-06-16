import type { InferType } from "yup";
import type { workerCreateFormSchema } from "./components/WorkerModalForm/form";

interface WorkerCreatePayloadInterface {
  name: string;
  role: string;
  matriculation: string;
  registry: string;
  departmentId?: string | null;
  department?: string | null;
  admissionDate: string;
  justification?: string;
  _id?: string;
}

type WorkerFormType = InferType<typeof workerCreateFormSchema>;

interface WorkerModalFormDataInterface {
  form: WorkerCreatePayloadInterface;
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

export type {
  WorkerCreatePayloadInterface,
  WorkerFormType,
  WorkerModalFormDataInterface,
  WorkerModalDataInterface,
};
