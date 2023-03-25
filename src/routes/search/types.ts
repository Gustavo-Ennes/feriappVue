import type { Department } from "../departments/types";
import type { Vacation } from "../vacation/types";

export type SearchDataContent = {
  vacations?: Vacation[];
  departments?: Department[];
  workers?: Worker[];
};

export interface SearchResultsFetchInterface {
  data?: {
    search?: SearchDataContent;
  };
  errors?: any;
}

export interface SearchDataInterface {
  results?: SearchDataContent;
}
