import { runQuery } from "@/graphql/graphql";
import { vacationsQuery } from "./query";

const getVacations = async () =>
  runQuery({
    label: "homeVacations",
    query: vacationsQuery,
  });

export { getVacations };
