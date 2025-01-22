import { ref } from "vue";
import type {
  Vacation,
  VacationFetchInterface,
  VacationPagination
} from "../types";
import { getVacationsByType } from "../fetch";
import type { VacationType } from "@/routes/workers/types";

const pastVacations = ref<VacationPagination | undefined>(undefined);
const presentVacations = ref<VacationPagination | undefined>(undefined);
const futureVacations = ref<VacationPagination | undefined>(undefined);
const selectedVacation = ref<Vacation | undefined>(undefined);

export function useVacations() {
  const setSelectedVacation = (vacation?: Vacation) =>
    (selectedVacation.value = vacation);

  const getVacations = (period: string) => {
    switch (period) {
      case "past":
        return pastVacations;
      case "present":
        return presentVacations;
      case "future":
        return futureVacations;
      default:
        break;
    }
  };

  type FetchVacationsParameterType = {
    type: VacationType;
    pastPage?: number;
    presentPage?: number;
    futurePage?: number;
  };

  const fetchVacations = async ({
    type,
    pastPage = 1,
    presentPage = 1,
    futurePage = 1
  }: FetchVacationsParameterType): Promise<void> => {
    const [{ data: pastData }, { data: presentData }, { data: futureData }] =
      await Promise.all([
        getVacationsByType(type, pastPage, "past"),
        getVacationsByType(type, presentPage, "present"),
        getVacationsByType(type, futurePage, "future")
      ]);

    const emptyPagination = {
      pageNumber: 0,
      totalPages: 0,
      totalResults: 0,
      items: []
    };

    pastVacations.value = pastData?.vacations ?? emptyPagination;
    presentVacations.value = presentData?.vacations ?? emptyPagination;
    futureVacations.value = futureData?.vacations ?? emptyPagination;
  };

  const resetVacations = () => {
    setSelectedVacation(undefined);
    pastVacations.value = undefined;
    presentVacations.value = undefined;
    futureVacations.value = undefined;
  };

  return {
    selectedVacation,
    setSelectedVacation,
    getVacations,
    resetVacations,
    pastVacations,
    presentVacations,
    futureVacations,
    fetchVacations
  };
}
