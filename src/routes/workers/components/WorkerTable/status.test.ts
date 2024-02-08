/*
 * @vitest-environment happy-dom
 */

import { afterEach, describe, expect, it, vi } from "vitest";

describe("delete worker function", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return correct translated status", async (): Promise<void> => {
    const { getTranslatedStatus } = await import("./status");
    expect(getTranslatedStatus("active")).to.equals("ativo");
    expect(getTranslatedStatus("license")).to.equals("de licença");
    expect(getTranslatedStatus("vacation")).to.equals("de férias");
    expect(getTranslatedStatus("dayOff")).to.equals("abonando");
  });
});
