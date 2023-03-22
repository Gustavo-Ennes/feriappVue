import { format } from "date-fns";
import type { Vacation } from "../types";
import {
  translateVacation,
  translateVacationSubtype,
  numberToNumberString,
} from "./utils";

const vacationParagraphBegin = (vacation: Vacation): string => `
\tAtravés deste, venho solicitar ${translateVacation(vacation.type)} de ${
  vacation.type === "dayOff"
    ? translateVacationSubtype(vacation.subType as string)
    : `${vacation.daysQtd} (${numberToNumberString(
        vacation.daysQtd
      )}) dia(s) de fruição`
}, `;

const vacationParagraphEnd = (
  vacation: Vacation
): string => `com início no dia ${format(
  new Date(vacation.startDate),
  "dd/MM/yyyy"
)} e término no dia ${format(
  new Date(vacation.endDate as string),
  "dd/MM/yyyy"
)}.\n\nNesses termos, peço deferimento.
`;

const vacationParagraph = (vacation: Vacation): string =>
  vacationParagraphBegin(vacation).concat(vacationParagraphEnd(vacation));

const dayOffParagraph = (vacation: Vacation): string => `
Através deste, venho requerer a Vossa Senhoria, conforme dispõe a Lei Complementar 001/1993 em seu capítulo IV, artigo 129, inciso IV o abono de trabalho de ${
  vacation.subType === "integral" ? "1(um) dia" : "meio experiente"
}, usufruindo em ${format(
  new Date(vacation.startDate),
  "dd/MM/yyyy"
)} para tratar de assuntos de interesse particular.\n\nNesses termos, peço deferimento.
`;

export { vacationParagraph, dayOffParagraph };
