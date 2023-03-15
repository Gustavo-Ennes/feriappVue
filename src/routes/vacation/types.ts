import type { Modal } from "bootstrap";
import type { InferType } from "yup";

import type { Worker } from "../worker/types";
import type { VacationCreateFormSchema } from "./components/vacationModal/components/form";

interface Vacation {
  _id: string;
  daysQtd: number;
  endDate?: string;
  subType?: string;
  startDate: string;
  worker: Worker | string;
  deferred?: boolean;
  observation?: string;
  enjoyed?: boolean;
  type: string;
}

interface VacationFetchInterface {
  data?: {
    vacations?: Vacation[];
    createVacation?: Vacation;
    updateVacation?: boolean;
    deleteVacation?: boolean;
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
  modal?: Modal;
  modalType?: string;
  vacation?: Vacation;
  workers?: Worker[];
  confirmationModal?: Modal
}

interface VacationModalFormInterface {
  worker: string | null;
  daysQtd: number | null;
  type?: string;
  startDate?: string;
  _id?: string;
}

interface VacationModalFormDataInterface {
  form: VacationModalFormInterface;
}

interface ToastPayloadInterface {
  title: string;
  type: string;
  text: string;
  _id?: string;
  icon?: string;
}

interface VacationModalDataInterface {
  workers: Worker[];
  dataToSend?: VacationModalFormInterface;
  errors?: string[];
  formModified: boolean;
  toastPayload?: ToastPayloadInterface;
}

type VacationFormType = InferType<typeof VacationCreateFormSchema>;

export type {
  Vacation,
  VacationDataInterface,
  VacationFetchInterface,
  WorkerFetchInterface,
  VacationFormType,
  VacationModalFormDataInterface,
  VacationModalDataInterface,
  ToastPayloadInterface,
  VacationModalFormInterface,
};
