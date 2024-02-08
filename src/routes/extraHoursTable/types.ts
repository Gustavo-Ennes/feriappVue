import type { Department } from "../departments/types";
import type { Worker } from "../workers/types";

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

type ExtraHourProcessData = {
  _id?: string;
  worker?: string | ExtraHourWorker;
  amount?: number;
  nightlyAmount?: number;
  department?: string | Department;
  reference?: Date;
};
type ExtraHourData = {
  extraHours: ExtraHour[];
  modified: ExtraHourProcessData[];
  created: ExtraHourProcessData[];
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
    processExtraHours: { created: number; updated: number; deleted: number };
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

type FakeThis = {
  departments?: any[];
  workers?: any[];
  extraHours?: any[];
  references?: string[];
  reference?: Date;
  modified?: any[];
  created?: any[];
  hasModifications?: boolean;
};
type FakeFetchResponse = {
  data: {
    workers?: any[];
    departments?: any[];
    extraHours?: any[];
    reference?: string;
  };
};
type GetMockedExtraHoursParam = {
  extraHours?: any[];
  departments?: any[];
  workers?: any[];
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
  ExtraHourProcessData,
  FakeThis,
  FakeFetchResponse,
  GetMockedExtraHoursParam
};
