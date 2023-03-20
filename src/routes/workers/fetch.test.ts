/*
 * @vitest-environment happy-dom
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import type { WorkerCreatePayloadInterface } from "./types";

const workerPayload: WorkerCreatePayloadInterface = {
  name: "worker1",
  role: "employee",
  registry: "654.987-5",
  matriculation: "315444",
  departmentId: "123i-9ujasd9-asd-08",
  admissionDate: new Date().toISOString(),
};

const workersFetchMockResponse = { data: { workers: [] } };
const departmentFetchMockResponse = { data: { departments: [] } };
const workerCreateMockResponse = {
  data: { createWorker: { ...workerPayload, _id: "123104871028dsaas1" } },
};
const workerErrorMockResponse = {
  data: { errors: [{}] },
};
const workerUpdateMockResponse = {
  data: {
    updateWorker: {
      ...workerPayload,
      _id: "123104871028dsaas1",
      name: "Silva",
    },
  },
};

describe("Worker fetch functions test", (): void => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get all workers", async (): Promise<void> => {
    const { fetchMockJson, storeDispatchFn } = await import("@/testUtils/mock");
    const { getWorkers } = await import("./fetch");

    fetchMockJson.mockReturnValue(workersFetchMockResponse);
    const workers = await getWorkers();
    expect(workers).to.deep.equals(workersFetchMockResponse);
    expect(storeDispatchFn.store.dispatch).toHaveBeenCalledTimes(2);
  });

  it("should get all departments", async (): Promise<void> => {
    const { fetchMockJson, storeDispatchFn } = await import("@/testUtils/mock");
    const { getDepartments } = await import("./fetch");

    fetchMockJson.mockReturnValue(departmentFetchMockResponse);
    const workers = await getDepartments();
    expect(workers).to.deep.equals(departmentFetchMockResponse);
    expect(storeDispatchFn.store.dispatch).toHaveBeenCalledTimes(2);
  });

  it("should create a worker", async (): Promise<void> => {
    const { fetchMockJson, storeDispatchFn } = await import("@/testUtils/mock");
    const { createWorker } = await import("./fetch");

    fetchMockJson.mockReturnValue(workerCreateMockResponse);
    const workers = await createWorker(workerPayload);
    expect(workers).to.deep.equals(workerCreateMockResponse);
    expect(storeDispatchFn.store.dispatch).toHaveBeenCalledTimes(2);
  });

  it("shouldn't create a worker if there's something wrong in payload", async (): Promise<void> => {
    const { fetchMockJson, storeDispatchFn } = await import("@/testUtils/mock");
    const { createWorker } = await import("./fetch");

    fetchMockJson.mockReturnValue(workerErrorMockResponse);
    const workers = await createWorker(workerPayload);
    expect(workers).to.deep.equals(workerErrorMockResponse);
    expect(storeDispatchFn.store.dispatch).toHaveBeenCalledTimes(2);
  });

  it("should update a worker", async (): Promise<void> => {
    const { fetchMockJson, storeDispatchFn } = await import("@/testUtils/mock");
    const { updateWorker } = await import("./fetch");

    fetchMockJson.mockReturnValue(workerUpdateMockResponse);
    const workers = await updateWorker({
      ...workerPayload,
      _id: "asodiiajsa9sduk1",
    });
    expect(workers).to.deep.equals(workerUpdateMockResponse);
    expect(storeDispatchFn.store.dispatch).toHaveBeenCalledTimes(2);
  });
  it("shouldn't update a worker if he doesn't exists", async (): Promise<void> => {
    const { fetchMockJson, storeDispatchFn } = await import("@/testUtils/mock");
    const { updateWorker } = await import("./fetch");

    fetchMockJson.mockReturnValue(workerUpdateMockResponse);
    const workers = await updateWorker({
      ...workerPayload,
      _id: "asodiiajsa9sduk1",
    });
    expect(workers).to.deep.equals(workerUpdateMockResponse);
    expect(storeDispatchFn.store.dispatch).toHaveBeenCalledTimes(2);
  });
});
