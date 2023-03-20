import type { Modal } from "bootstrap";

interface Department {
  _id?: string;
  name?: string;
}

interface DepartmentFetchResponse {
  data: {
    department?: Department;
    departments?: Department[];
    createDepartment?: Department;
    updateDepartment?: boolean;
    deleteDepartment?: boolean;
  };
  errors?: any;
}

interface DepartmentsDataInterface {
  departments?: Department[] | null;
  department?: Department;
  modal?: Modal;
  confirmationModal?: Modal;
  modalType?: "create" | "update";
}

interface ToastInterface {
  title?: string;
  text?: string;
  type?: string;
}

interface DepartmentModalDataInterface {
  dataToSend?: Department;
  errors?: string[];
  formModified?: boolean;
  toastPayload?: ToastInterface;
}

interface DepartmentFormInterface {
  name?: string;
}
interface DepartmentModalFormDataInterface {
  form: DepartmentFormInterface;
}

type ValidatedResponse = {
  validatedForm?: Department;
  errors?: string[];
};

export type {
  Department,
  DepartmentFetchResponse,
  DepartmentsDataInterface,
  DepartmentModalDataInterface,
  DepartmentModalFormDataInterface,
  DepartmentFormInterface,
  ValidatedResponse,
};
