import { vi } from "vitest";

const fetchMockJson = vi.fn();
const fetchMock = vi.fn(() => ({
  json: fetchMockJson
}));
const getReferenceMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

const storeDispatchFn = {
  store: {
    dispatch: vi.fn()
  }
};
vi.mock(
  "@/store/store",
  vi.fn(() => storeDispatchFn)
);
vi.mock("./@/routes/utils", async () => {
  const mod = await vi.importActual<typeof import("@/routes/utils")>(
    "/@/routes/utils"
  );
  return {
    ...mod,
    getReference: getReferenceMock
  };
});

export { fetchMockJson, storeDispatchFn, getReferenceMock };
