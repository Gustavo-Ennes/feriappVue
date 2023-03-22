import type { PDFDocument } from "pdf-lib";
import type { Worker } from "@/routes/workers/types";

import type { Height } from "@/pdf/types";

type JustificationPdfFnParam = {
  document: PDFDocument;
  worker: Worker;
};

interface DrawJustificationBlockParams extends JustificationPdfFnParam {
  height: Height;
}

export type { JustificationPdfFnParam, DrawJustificationBlockParams };
