import type { Department } from "../workers/types";

type ExtraHour = {
  _id: string;
  worker: ExtraHourWorker;
  amount: number;
  nightAmount: number;
  reference: Date;
};

type ExtraHourInput = {
  _id?: string;
  worker?: string;
  amount?: number;
  nightAmount?: number;
  reference?: Date;
  to?: string;
  from?: string;
};

type ExtraHourData = {
  extraHours: ExtraHour[];
  modified: ExtraHourInput[];
  workers: ExtraHourWorker[];
  selectedWorker?: ExtraHourWorker;
  reference?: Date;
  references?: Date[];
  hasModifications: boolean;
};

type ExtraHourFetch = {
  data?: {
    extraHour?: ExtraHour | null;
    extraHours?: ExtraHour[];
    createExtraHour?: ExtraHour | null;
    updateExtraHour?: boolean;
    deleteExtraHour?: boolean;
    workers: ExtraHourWorker[];
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
  department: Department
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
