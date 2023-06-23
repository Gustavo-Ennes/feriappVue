import { describe, it, expect } from "vitest";
import { parse } from "date-fns";

import { buildExtraHoursWithRangeVariables } from "./utils";

describe("ExtraHour utils functions tests", () => {
  it("should get an object with first day an last day of the given refence month", () => {
    expect(
      buildExtraHoursWithRangeVariables({
        reference: parse("04/2023", "MM/yyyy", new Date()),
      })
    ).to.deep.equals({
      extraHourInput: {
        to: "2023-05-01T02:59:59.999Z",
        from: "2023-04-01T03:00:00.000Z",
      },
    });
    expect(
      buildExtraHoursWithRangeVariables({
        reference: parse("05/2023", "MM/yyyy", new Date()),
      })
    ).to.deep.equals({
      extraHourInput: {
        to: "2023-06-01T02:59:59.999Z",
        from: "2023-05-01T03:00:00.000Z",
      },
    });
    expect(
      buildExtraHoursWithRangeVariables({
        reference: parse("02/2023", "MM/yyyy", new Date()),
      })
    ).to.deep.equals({
      extraHourInput: {
        to: "2023-03-01T02:59:59.999Z",
        from: "2023-02-01T03:00:00.000Z",
      },
    });
  });
});
