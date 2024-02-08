import { store } from "@/store/store";
import { set } from "date-fns";
import { object, string, type Schema, number } from "yup";

import type { VacationFormType } from "../../../types";

const VacationCreateFormSchema: Schema = object({
  daysQtd: number()
    .required("A quantidade de dias é obrigatória")
    .oneOf([90, 75, 60, 45, 30, 15, 1, 0.5], "Quantidade de dias inválida"),
  worker: string().required("O id do trabalhador é obrigatório"),
  type: string()
    .required("O registro é obrigatório")
    .oneOf(["vacation", "license", "dayOff"], "Tipo de férias é inválido"),
  startDate: string()
    .required("Data de início é obrigatória")
    .matches(
      /^\d{4}\-\d{2}\-\d{2}$/gm,
      "A data de início das férias precisa estar nesse formato: yyyy/MM/dd"
    ),
  _id: string()
});

const validateForm = async (
  payload: VacationFormType
): Promise<VacationFormType> => {
  const response: {
    validatedForm?: VacationFormType;
    errors?: string[];
  } = {};
  try {
    store.dispatch("startLoading");
    const validatedForm: VacationFormType =
      await VacationCreateFormSchema.validate(payload, {
        abortEarly: false
      });
    response.validatedForm = validatedForm;
  } catch (error: any) {
    console.log("Error validating form :", error);
    response.errors = error.errors;
  } finally {
    store.dispatch("stopLoading");
    return response;
  }
};

export type { VacationCreateFormSchema };
export { validateForm };
