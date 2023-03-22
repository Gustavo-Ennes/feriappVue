import type { Vacation } from "@/routes/vacation/types";
import type { PDFDocument } from "pdf-lib";

type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
};

type PdfFnParam = {
  document?: PDFDocument;
  vacation: Vacation
};

type CreatePdfParams = {
  name: string;
  pdfFn: (pdfFnParam: PdfFnParam) => Promise<void>;
  vacation: Vacation
};

type CreateTitleParams = {
  title: string;
  document: PDFDocument;
  height: Height;
  type?: string;
};

type CreateParagraphParams = {
  text: string;
  document: PDFDocument;
  height: Height;
  fontSize?: number;
  x?: number;
  y?: number;
};

type CreateSignParams = {
  document: PDFDocument;
  height: Height;
  name: string;
  role: string;
  matriculation?: string;
};

export type {
  PdfFnParam,
  CreatePdfParams,
  CreateTitleParams,
  CreateParagraphParams,
  CreateSignParams,
  Height,
};
