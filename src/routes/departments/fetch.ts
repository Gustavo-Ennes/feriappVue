import { runQuery } from "@/graphql/graphql";
import {
  createDepartmentMutation,
  deleteDepartmentMutation,
  updateDepartmentMutation
} from "./mutation";
import { departmentQuery, departmentsQuery } from "./query";
import type { Department, DepartmentFetchResponse } from "./types";

const getDepartment = async (_id: string): Promise<DepartmentFetchResponse> =>
  runQuery({
    query: departmentQuery,
    label: "department",
    variables: { _id }
  });

const getDepartments = async (): Promise<DepartmentFetchResponse> =>
  runQuery({
    query: departmentsQuery,
    label: "departments"
  });

const createDepartment = async (
  departmentInput: Department
): Promise<DepartmentFetchResponse> =>
  runQuery({
    query: createDepartmentMutation,
    label: "createDepartment",
    variables: { departmentInput }
  });

const updateDepartment = async (
  departmentInput: Department
): Promise<boolean> =>
  runQuery({
    query: updateDepartmentMutation,
    label: "updateDepartment",
    variables: { departmentInput }
  });

const deleteDepartment = async (_id: string): Promise<boolean> =>
  runQuery({
    query: deleteDepartmentMutation,
    label: "deleteDepartment",
    variables: { _id }
  });

export {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
