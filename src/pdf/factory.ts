import { translateVacationSubtype } from "@/routes/vacation/pdf/utils";
import type { PDFDocument } from "pdf-lib";

import type {
  CreateSignParams,
  CreateParagraphParams,
  CreateTitleParams,
  Height,
} from "./types";

const createHeader = async (document: PDFDocument): Promise<void> => {
  const header =
    "https://storage.googleapis.com/feriappjs/feriapp-pdf-header.png";
  const headerBuffer = await fetch(header).then((res) => res.arrayBuffer());
  const pngHeaderImage = await document.embedPng(headerBuffer);
  const pngHeaderDims = pngHeaderImage.scale(0.75);
  const page = document.getPage(0);

  page.drawImage(pngHeaderImage, {
    x: 20,
    y: page.getHeight() - 55,
    width: pngHeaderDims.width,
    height: pngHeaderDims.height,
    opacity: 1,
  });
};

const createFooter = async (document: PDFDocument): Promise<void> => {
  const footer =
    "https://storage.googleapis.com/feriappjs/feriapp-pdf-footer.png";
  const footerBuffer = await fetch(footer).then((res) => res.arrayBuffer());
  const pngFooterImage = await document.embedPng(footerBuffer);
  const pngFooterDims = pngFooterImage.scale(0.75);
  const page = document.getPage(0);

  page.drawImage(pngFooterImage, {
    x: 20,
    y: 15,
    width: pngFooterDims.width,
    height: pngFooterDims.height,
    opacity: 1,
  });
};

const createTitle = async ({
  type,
  title,
  document,
  height,
}: CreateTitleParams): Promise<void> => {
  const page = document.getPage(0);
  // title
  page.drawText(title.toUpperCase(), {
    y: height.actual,
    x: type === "license" ? 65 : 130,
  });
};

const createParagraph = async ({
  document,
  text,
  height,
  fontSize = 13,
  x = 50,
  y = height.actual,
}: CreateParagraphParams): Promise<void> => {
  const page = document.getPage(0);
  page.drawText(text, {
    y,
    x,
    size: fontSize,
    maxWidth: page.getWidth() - 100,
  });
};

const createSign = async ({
  name,
  role,
  document,
  height,
  matriculation,
}: CreateSignParams): Promise<void> => {
  const page = document.getPage(0);
  const roleString = `Função: ${role}`;
  const matriculationString = matriculation ? ` ~ Matr.: ${matriculation}` : "";
  const aboveNameLine = roleString.concat(matriculationString);

  page.drawLine({
    start: { x: 200, y: height.actual },
    end: { x: 400, y: height.actual },
  });
  height.stepLine();
  page.drawText(name, {
    y: height.actual,
    x: 295 - name.length * 3,
    size: 13,
  });
  height.stepLine();
  if (aboveNameLine) {
    page.drawText(aboveNameLine, {
      y: height.actual,
      x: 295 - aboveNameLine.length * 2.3,
      size: 11,
    });
    height.stepLine();
  }
};

const createDaysQtd = async ({
  document,
  daysQtd,
  height,
  subtype,
}: {
  document: PDFDocument;
  daysQtd: number;
  height: Height;
  subtype?: string;
}): Promise<void> => {
  const page = document.getPage(0);
  const text = subtype
    ? `${translateVacationSubtype(subtype)}`
    : `${daysQtd} dias`;
  page.drawText(text, {
    y: height.actual + 10,
    x: subtype ? page.getWidth() - 120 : page.getWidth() - 80,
    size: 14,
  });
};

export {
  createHeader,
  createFooter,
  createTitle,
  createParagraph,
  createSign,
  createDaysQtd,
};
