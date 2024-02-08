import type {
  DepartmentFormInterface,
  ValidatedResponse
} from "@/routes/departments/types";
import { store } from "@/store/store";
import { object, string, type Schema } from "yup";

const departmentFormSchema: Schema = object({
  name: string()
    .required("O nome é obrigatório")
    .min(3, "Tamanho mínimo de nome: 3")
    .transform((value: string, _: any): string => {
      return !!value ? value.toLowerCase() : value;
    }),
  responsible: string()
    .required("O nome do responsável é obrigatório")
    .min(3, "tamanho mínimo de nome: 3")
    .transform((value: string, _: any): string => {
      return !!value ? value.toLowerCase() : value;
    })
});

const validateForm = async (
  payload: DepartmentFormInterface
): Promise<ValidatedResponse> => {
  const response: ValidatedResponse = {};
  try {
    store.dispatch("startLoading");
    const validatedForm: DepartmentFormInterface =
      await departmentFormSchema.validate(payload, {
        abortEarly: false
      });
    response.validatedForm = validatedForm;
  } catch (error: any) {
    console.log("Error at validation :", error);
    response.errors = error.errors;
  } finally {
    store.dispatch("stopLoading");
    return response;
  }
};

export type { departmentFormSchema };
export { validateForm };
