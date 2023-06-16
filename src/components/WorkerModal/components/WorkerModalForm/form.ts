import { store } from "@/store/store";
import { object, string, type Schema } from "yup";

import type { WorkerFormType } from "../../../../routes/workers/types";

const workerCreateFormSchema: Schema = object({
  name: string()
    .required("O nome é obrigatório")
    .min(3, "Tamanho mínimo de nome: 3")
    .transform((value: string, _: any): string => {
      return !!value ? value.toLowerCase() : value;
    }),
  role: string()
    .required("O servidor precisa de um cargo")
    .transform((value: string, _: any): string => {
      return !!value ? value.toLowerCase() : value;
    }),
  registry: string()
    .required("O registro é obrigatório")
    .matches(/^\d{5,7}$/gm, "Matrícula precisa ter 6 dígitos"),
  matriculation: string()
    .required("A matrícula é obrigatória")
    .matches(
      /^\d{1,3}\.\d{3}\-\d$/gm,
      "O registro precisa estar nesse formato: xx.xxx-x ou xxx.xxx-x"
    ),
  department: string().required("O departamento é obrigatório"),
  admissionDate: string()
    .required("Data de admissão é obrigatória")
    .matches(
      /^\d{4}\-\d{2}\-\d{2}$/gm,
      "A data de admissão precisa estar nesse formato: yyyy/MM/dd"
    ),
  status: string().default("active"),
  _id: string(),
  justification: string().min(10, "Tamanho mínimo de justificativa: 10"),
});

const validateForm = async (
  payload: WorkerFormType
): Promise<WorkerFormType> => {
  const response: {
    validatedForm?: WorkerFormType;
    errors?: string[];
  } = {};
  try {
    store.dispatch("startLoading");
    const validatedForm: WorkerFormType = await workerCreateFormSchema.validate(
      payload,
      {
        abortEarly: false,
      }
    );
    response.validatedForm = validatedForm;
  } catch (error: any) {
    console.log("Error at validating form:", error);
    response.errors = error.errors;
  } finally {
    store.dispatch("stopLoading");
    return response;
  }
};

export type { workerCreateFormSchema };
export { validateForm };
