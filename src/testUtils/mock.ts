import { vi } from "vitest";

const fetchMockJson = vi.fn();
const fetchMock = vi.fn(() => ({
  json: fetchMockJson,
}));
vi.stubGlobal("fetch", fetchMock);

const storeDispatchFn = {
  store: {
    dispatch: vi.fn(),
  },
};
vi.mock(
  "@/store/store",
  vi.fn(() => storeDispatchFn)
);

export { fetchMockJson, storeDispatchFn };
