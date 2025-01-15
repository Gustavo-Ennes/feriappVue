import { runQuery } from "@/graphql/graphql";
import { vacationsQuery } from "../vacation/query";
import type { VacationFetchInterface } from "../vacation/types";

const getVacations = async (): Promise<VacationFetchInterface> =>
  runQuery({
    label: "homeVacations",
    query: vacationsQuery
  });

export { getVacations };
