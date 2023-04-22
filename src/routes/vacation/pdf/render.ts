import {
  createDaysQtd,
  createFooter,
  createHeader,
  createParagraph,
  createSign,
  createTitle,
} from "@/pdf/factory";
import type { PdfFnParam } from "@/pdf/types";
import type { DrawHalfPageParams, Vacation } from "../types";
import type { Worker } from "@/routes/workers/types";
import { getParagraph, translateMonth, translateVacation } from "./utils";
import { capitalizeName } from "@/routes/utils";

const drawHalfPage = async ({
  document,
  height,
  vacation,
}: DrawHalfPageParams): Promise<void> => {
  const page = document.getPage(0);
  const paragraph = getParagraph(vacation);

  await createHeader(document);
  await createFooter(document);
  await createDaysQtd({
    document,
    daysQtd: vacation.daysQtd,
    height,
    subtype: vacation.subType,
  });
  await createTitle({
    title: `Requerimento de ${translateVacation(vacation.type)}`,
    document,
    height,
    type: vacation.type,
  });

  height.stepHugeLine();
  await createParagraph({
    document,
    height,
    text: paragraph,
    fontSize: vacation.type === "license" ? 12 : 14,
  });

  height.stepHugeLine();
  height.stepHugeLine();
  height.stepSmallLine();

  const dateString = `Ilha solteira, ${new Date(
    vacation.updatedAt
  ).getDate()} de ${translateMonth(
    new Date(vacation.updatedAt).getMonth()
  )} de ${new Date(vacation.updatedAt).getFullYear()}`;
  await createParagraph({
    document,
    height,
    text: dateString,
    x: page.getWidth() - dateString.length * 7.5,
    ...(vacation.type === "dayOff" && {
      y: height.actual - 15,
    }),
  });

  height.stepHugeLine();
  height.stepSmallLine();
  await createSign({
    document,
    height,
    name: capitalizeName((vacation.worker as unknown as Worker).name),
    matriculation: (vacation.worker as unknown as Worker).matriculation,
    role: capitalizeName((vacation.worker as unknown as Worker).role),
  });

  height.stepHugeLine();
  await createSign({
    document,
    height,
    name: "Sebastião Arosti",
    role: "Diretor do transporte",
  });
};

const render = async ({ document, instance }: PdfFnParam): Promise<void> => {
  if (document) {
    const page = document.addPage();
    const height = {
      actual: page.getHeight() - 80,
      stepLine() {
        this.actual -= 15;
      },
      stepSmallLine() {
        this.actual -= 12;
      },
      stepHugeLine() {
        this.actual -= 45;
      },
    };
    await drawHalfPage({ document, height, vacation: instance as Vacation });
    height.stepHugeLine();
    await drawHalfPage({ document, height, vacation: instance as Vacation });
  }
};

export { render };
