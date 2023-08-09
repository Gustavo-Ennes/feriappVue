import { set } from "date-fns";
import { describe, it, expect } from "vitest";
import { assoc, curry, groupBy, head } from "ramda";

import {
  _fetchExtraHours,
  _fetchReferences,
  _findExtraHour,
  _getUpdatedExtraHour,
  _handleCalendarModification,
  _preProcessExtraHours,
} from "./extraHourTable";
import { fetchMockJson } from "@/testUtils/mock";
import type {
  ExtraHourInput,
  FakeFetchResponse,
  FakeThis,
  GetMockedExtraHoursParam,
} from "./types";
import { getRandomMockedRefs } from "./utils";

const _this: FakeThis = {
  reference: new Date(),
  modified: [],
};

const extraHours = [
  {
    worker: { name: "Willian Bonner", _id: "1" },
    reference: set(new Date(), { date: 1 }),
    amount: 1,
    nightlyAmount: 0,
    department: { _id: "12" },
  },
  {
    worker: { name: "Toninho Paucomprégo", _id: "2" },
    reference: set(new Date(), { date: 1 }),
    amount: 2,
    nightlyAmount: 0,
    department: { _id: "12" },
  },
  {
    worker: { name: "Elias Maluco", _id: "3" },
    reference: set(new Date(), { date: 1 }),
    amount: 2,
    nightlyAmount: 0,
    department: { _id: "12" },
  },
  {
    worker: { name: "Willian Bonner", _id: "1" },
    reference: set(new Date(), { date: 2 }),
    amount: 4,
    nightlyAmount: 0,
    department: { _id: "13" },
  },
];

const getMockedExtraHours = ({
  extraHours = [],
  workers = [],
  departments = [],
}: GetMockedExtraHoursParam): FakeFetchResponse => ({
  data: {
    extraHours,
    workers,
    departments,
    reference: new Date().toDateString(),
  },
});

describe("ExtraHourTable methods tests", () => {
  it("should fetch references", async () => {
    const randomRefs = getRandomMockedRefs();
    fetchMockJson.mockReturnValueOnce({ data: { extraHours: randomRefs } });
    await _fetchReferences(_this);
    const groups = groupBy(
      (reference: string) => reference,
      _this.references ?? []
    );
    Object.keys(groups).forEach((groupKey) =>
      expect(groups[groupKey]).toHaveLength(1)
    );
    expect(_this).toHaveProperty("references");
  });

  it("should fetch extraHours", async () => {
    fetchMockJson.mockReturnValueOnce({ data: { extraHours, workers:[], departments:[] } });
    await _fetchExtraHours(_this);
    expect(_this).toHaveProperty("extraHours");
    expect(_this?.extraHours).to.not.be.empty;
    expect(_this?.extraHours?.[0]?.worker?.name).toBe("Elias Maluco");
    expect(_this?.extraHours?.[_this.extraHours.length - 1]?.worker?.name).toBe(
      "Willian Bonner"
    );
  });

  // find an extraHour by a worker and by a day
  it("should find an extraHour", () => {
    const worker1 = { _id: "1", name: "", department: { name: "" } };
    const worker2 = { ...worker1, _id: "2" };
    const worker3 = { ...worker1, _id: "3" };
    const findExtraHourCurry = curry(_findExtraHour)({ extraHours });
    const resultWorker1Day1 = findExtraHourCurry({ worker: worker1, day: 1 });
    const resultWorker1Day2 = findExtraHourCurry({ worker: worker1, day: 2 });
    const resultWorker2Day2 = findExtraHourCurry({ worker: worker2, day: 2 });
    const resultWorker3Day2 = findExtraHourCurry({ worker: worker3, day: 2 });

    expect(resultWorker1Day1?.worker).toHaveProperty("name", "Willian Bonner");
    expect(resultWorker1Day2?.worker).toHaveProperty("name", "Willian Bonner");
    expect(resultWorker2Day2?.worker).to.be.undefined;
    expect(resultWorker3Day2?.worker).to.be.undefined;
  });

  // there are two arrays for extrahours: created e modified
  // the functions receives a new object and return it merged with it's previous version
  it("should update an extra hour in modified array", () => {
    const extraHour = head(extraHours);
    const modifiedExtraHour = assoc("amount", 12, extraHour);
    _this.modified = [extraHour];
    _this.created = [];

    const updatedExtraHour = _getUpdatedExtraHour(
      _this,
      modifiedExtraHour as unknown as ExtraHourInput
    );
    expect(updatedExtraHour?.original).to.be.deep.equals(extraHour);
    expect(updatedExtraHour?.updated).to.be.deep.equals(modifiedExtraHour);
  });

  it("should update an extra hour in created array", () => {
    const extraHour = head(extraHours);
    const modifiedExtraHour = assoc("nightlyAmount", 12, extraHour);
    _this.modified = [];
    _this.created = [extraHour];

    const updatedExtraHour = _getUpdatedExtraHour(
      _this,
      modifiedExtraHour as unknown as ExtraHourInput
    );
    expect(updatedExtraHour?.original).to.be.deep.equals(extraHour);
    expect(updatedExtraHour?.updated).to.be.deep.equals(modifiedExtraHour);
  });

  it("should return undefined if there's no item in both created or modified array", () => {
    _this.modified = [];
    _this.created = [];

    const updatedExtraHour = _getUpdatedExtraHour(
      _this,
      head(extraHours) as unknown as ExtraHourInput
    );
    expect(updatedExtraHour?.original).to.be.undefined;
    expect(updatedExtraHour?.updated).to.be.deep.equals(head(extraHours));
  });

  it("should handle the calendar modification if extraHour already exists(has an _id prop, put in _this.created)", () => {
    _this.modified = [];
    _this.created = [];
    _this.hasModifications = false;

    _handleCalendarModification(
      _this,
      assoc("_id", 1, head(extraHours)) as unknown as ExtraHourInput
    );
    expect(_this.created).to.have.length(0);
    expect(_this.modified).to.have.length(1);
  });

  it("should handle the calendar modification if extraHour already exists(has an _id prop, update in _this.modified)", () => {
    const extraHour = assoc("_id", 1, head(extraHours));
    _this.modified = [extraHour];
    _this.created = [];
    _this.hasModifications = false;

    _handleCalendarModification(
      _this,
      assoc("amount", 12, extraHour) as unknown as ExtraHourInput
    );
    expect(_this.created).to.have.length(0);
    expect(_this.modified).to.have.length(1);
    expect(_this.modified?.[0]?.amount).to.be.equals(12);
  });

  it("should handle the calendar modification if extraHour not exists (hasn't an _id prop)", () => {
    _this.modified = [];
    _this.created = [];
    _this.hasModifications = false;

    _handleCalendarModification(
      _this,
      head(extraHours) as unknown as ExtraHourInput
    );
    expect(_this.created).to.have.length(1);
    expect(_this.modified).to.have.length(0);
  });

  it("should handle the calendar modification if extraHour already exists(hasn't an _id prop, update in _this.created)", () => {
    const extraHour = head(extraHours);
    _this.modified = [];
    _this.created = [extraHour];
    _this.hasModifications = false;

    _handleCalendarModification(
      _this,
      assoc("amount", 12, extraHour) as unknown as ExtraHourInput
    );
    expect(_this.created).to.have.length(1);
    expect(_this.modified).to.have.length(0);
    expect(_this.created?.[0]?.amount).to.be.equals(12);
  });

  it("should pre process extraHours", () => {
    const extraHour1 = head(extraHours);
    const extraHour2 = assoc("_id", "53", extraHours[extraHours.length - 1]);
    _this.modified = [extraHour2];
    _this.created = [extraHour1];
    _this.hasModifications = false;
    const preProcessedExtraHours = _preProcessExtraHours(_this);

    expect(preProcessedExtraHours?.[0]).to.have.property("worker", "1");
    expect(preProcessedExtraHours?.[0]).to.have.property("department", "12");
    expect(preProcessedExtraHours?.[1]).to.have.property("worker", "3");
    expect(preProcessedExtraHours?.[1]).to.have.property("department", "12");
  });
});
