import type { Vacation } from "@/routes/vacation/types";
import type { Worker } from "@/routes/workers/types";
import type { PDFDocument } from "pdf-lib";

type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
  stepSmallLine: () => void;
};

type PdfFnParam = {
  document?: PDFDocument;
  instance: Vacation | Worker;
};

type CreatePdfParams = {
  name: string;
  pdfFn: (pdfFnParam: PdfFnParam) => Promise<void>;
  instance: Vacation | Worker;
};

type CreateTitleParams = {
  title: string;
  document: PDFDocument;
  height: Height;
  type?: string;
  size?: number;
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
  x?: number;
};

export type {
  PdfFnParam,
  CreatePdfParams,
  CreateTitleParams,
  CreateParagraphParams,
  CreateSignParams,
  Height,
};
