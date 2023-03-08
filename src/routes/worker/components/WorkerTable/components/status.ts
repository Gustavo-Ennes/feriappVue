import type { TranslatedStatusObject } from "@/routes/worker/types";

const translatedStatusObject: TranslatedStatusObject = {
  active: "ativo",
  license: "de licença",
  vacation: "de férias",
  dayOff: "abonando",
};

const getTranslatedStatus = (
  englishStatus: keyof TranslatedStatusObject
): string | undefined => translatedStatusObject[englishStatus];

export { getTranslatedStatus };
