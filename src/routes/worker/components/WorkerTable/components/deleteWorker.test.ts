/*
 * @vitest-environment happy-dom
 */

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

describe("delete worker function", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should delete a worker", async (): Promise<void> => {
    const { fetchMockJson, storeDispatchFn } = await import("@/testUtils/mock");
    const { deleteWorker } = await import("./deleteWorker");

    fetchMockJson.mockReturnValue(true);
    const deleteWorkerResponse = await deleteWorker({ _id: "asdasd1342wdf3" });
    expect(deleteWorkerResponse).to.be.true;
    expect(storeDispatchFn.store.dispatch).toHaveBeenCalledTimes(2);
  });
});
