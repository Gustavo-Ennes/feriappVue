import type { Department } from "../departments/types";

type ExtraHour = {
  _id: string;
  worker: ExtraHourWorker;
  amount: number;
  nightlyAmount: number;
  department: Department;
  reference: Date;
};

type ExtraHourInput = {
  _id?: string;
  worker?: string;
  amount?: number;
  nightlyAmount?: number;
  department?: string;
  reference?: Date;
  to?: string;
  from?: string;
};

type ExtraHourData = {
  extraHours: ExtraHour[];
  modified: ExtraHourInput[];
  created: ExtraHourInput[];
  workers: ExtraHourWorker[];
  selectedWorker?: ExtraHourWorker;
  reference?: Date;
  references?: Date[];
  hasModifications: boolean;
  departments?: Department[];
};

type ExtraHourFetch = {
  data?: {
    extraHour?: ExtraHour | null;
    extraHours?: ExtraHour[];
    createExtraHour?: ExtraHour | null;
    updateExtraHour?: boolean;
    deleteExtraHour?: boolean;
    workers: ExtraHourWorker[];
    departments: Department[];
  };
  errors?: any;
};

type ExtraHourTableParam = {
  worker: ExtraHourWorker;
  day: number;
};

type BuildExtraHoursWithRangeVariables = {
  reference: Date;
};

type ExtraHourInputWrapper = {
  extraHourInput: ExtraHourInput;
};

type ExtraHoutWorkerSelectData = {
  worker?: ExtraHourWorker;
  reference?: Date;
};

type ExtraHourWorker = {
  _id: string;
  name: string;
  department: Department;
};

export type {
  ExtraHour,
  BuildExtraHoursWithRangeVariables,
  ExtraHourInputWrapper,
  ExtraHourFetch,
  ExtraHourInput,
  ExtraHourData,
  ExtraHourTableParam,
  ExtraHoutWorkerSelectData,
  ExtraHourWorker,
};
