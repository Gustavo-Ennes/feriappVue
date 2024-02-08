import { format, isSameDay, parse, set } from "date-fns";
import { clone, concat, find, pluck, uniq, update } from "ramda";

import {
  extraHoursReferences,
  getExtraHoursWithRange,
  processExtraHours
} from "./fetch";
import type {
  ExtraHour,
  ExtraHourFetch,
  ExtraHourInput,
  ExtraHourProcessData,
  ExtraHourTableParam,
  ExtraHourWorker
} from "./types";
import type { Department } from "../departments/types";

const _fetchReferences = async (_this: any) => {
  const { data }: ExtraHourFetch = await extraHoursReferences();
  if (data?.extraHours) {
    const pluckedRefs = pluck("reference", data.extraHours);
    const monthYearRef = pluckedRefs.map((value) =>
      format(new Date(value), "MM/yyyy")
    );
    monthYearRef.push(format(new Date(), "MM/yyyy"));
    const uniqueRefs = uniq(monthYearRef);
    _this.references = uniqueRefs.map((ref) =>
      parse(ref, "MM/yyyy", new Date())
    );
  }
};

const _fetchExtraHours = async (_this: any) => {
  if (_this.reference) {
    const { data }: ExtraHourFetch = await getExtraHoursWithRange(
      _this.reference
    );
    if (data?.extraHours && data?.workers) {
      _this.extraHours = data.extraHours.sort(
        (
          { worker: { name: __name } }: ExtraHour,
          { worker: { name: _name } }: ExtraHour
        ) => (_name < __name ? 1 : -1)
      );
      _this.workers = data.workers;
      _this.departments = data.departments;
    }
  }
};

// finds an extraHour based in a worker and a date
const _findExtraHour = (
  _this: any,
  { worker: _worker, day }: ExtraHourTableParam
) => {
  return _this.extraHours.filter(({ worker, reference }: ExtraHour) => {
    return (
      worker._id === _worker._id &&
      isSameDay(set(reference, { date: day }), reference)
    );
  })?.[0];
};

// There are two arrays to control the changes in extraHours
// this certifies that there's only one extrahour of the same day and updates it's value
const _getUpdatedExtraHour = (_this: any, extraHour: ExtraHourInput) => {
  const allExtraHours = concat(_this.modified, _this.created);
  const findExtraHourToUpdate = find<ExtraHourProcessData>(({ reference }) =>
    isSameDay(reference as Date, extraHour.reference as Date)
  );
  const extraHourToUpdate = findExtraHourToUpdate(allExtraHours);
  const calculateAmount = (number: any) =>
    !number || isNaN(number) ? 0 : number;
  const newExtraHour = {
    ...(extraHourToUpdate ? extraHourToUpdate : extraHour),
    amount: calculateAmount(extraHour.amount),
    nightlyAmount: calculateAmount(extraHour.nightlyAmount)
  };
  return { original: extraHourToUpdate, updated: newExtraHour };
};

// check if the extraHour already has been changed in created or modified array
// and update it's value or just includes it in the array
const _handleCalendarModification = (_this: any, extraHour: ExtraHourInput) => {
  if (extraHour) {
    _this.hasModifications = true;
    const { original, updated } = _getUpdatedExtraHour(_this, extraHour);
    const index = _this.modified.indexOf(original ?? {});
    if (extraHour._id) {
      _this.modified = original
        ? update(index, updated, _this.modified)
        : [..._this.modified, updated];
    } else {
      _this.created = original
        ? update(index, updated, _this.created)
        : [..._this.created, updated];
    }
  }
};

// just transform all extraHours in created and modified array from it's object
// to just it's reference _id
const _preProcessExtraHours = (_this: any): ExtraHourProcessData[] => {
  const arrayWithCreationsAndUpdates = [..._this.modified, ..._this.created];
  return arrayWithCreationsAndUpdates.map((arrItem) => {
    const cloned = clone(arrItem);
    if ((cloned.worker as ExtraHourWorker)?._id) {
      cloned.worker = (cloned.worker as ExtraHourWorker)._id;
    }
    if ((cloned.department as Department)._id) {
      cloned.department = (cloned.department as Department)._id;
    }
    return cloned;
  });
};

const _handleSaveExtraHours = async (_this: any) => {
  if (_this.modified.length || _this.created.length) {
    const preProcessedExtraHours = _preProcessExtraHours(_this);
    await processExtraHours(preProcessedExtraHours);
    await _this.resetExtraHour();
  }
};

export {
  _fetchReferences,
  _fetchExtraHours,
  _findExtraHour,
  _getUpdatedExtraHour,
  _handleCalendarModification,
  _preProcessExtraHours,
  _handleSaveExtraHours
};
