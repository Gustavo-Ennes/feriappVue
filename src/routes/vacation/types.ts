import type { Height } from "@/routes/pdf/types";
import type { Modal } from "bootstrap";
import type { PDFDocument } from "pdf-lib";
import type { InferType } from "yup";

import type { Worker } from "../workers/types";
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
  createdAt: string;
  updatedAt: string;
  boss: Boss | string;
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
    vacations?: Vacation[];
  };
  errors?: any;
}

interface BossFetchInterface {
  data: {
    bosses?: Boss[];
    boss?: Boss;
  };
  error: any;
}

interface VacationDataInterface {
  vacations?: Vacation[];
  modal?: Modal;
  modalType?: string;
  vacation?: Vacation;
  workers?: Worker[];
  confirmationModal?: Modal;
}

type Boss = {
  _id: string;
  name: string;
  role: string;
  isDirector: boolean;
  createdAt: Date;
  updatedAt: Date;
};

interface VacationModalFormInterface {
  worker: string | null;
  daysQtd: number | null;
  type?: string;
  startDate?: string;
  _id?: string;
  boss?: string | null;
}

interface VacationModalFormDataInterface {
  bosses: Boss[];
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

type DrawHalfPageParams = {
  height: Height;
  document: PDFDocument;
  vacation: Vacation;
};
export type {
  Boss,
  BossFetchInterface,
  Vacation,
  VacationDataInterface,
  VacationFetchInterface,
  WorkerFetchInterface,
  VacationFormType,
  VacationModalFormDataInterface,
  VacationModalDataInterface,
  ToastPayloadInterface,
  VacationModalFormInterface,
  DrawHalfPageParams
};
