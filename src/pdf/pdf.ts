import { PDFDocument } from "pdf-lib";
import downloadjs from "downloadjs";

import type { CreatePdfParams } from "./types";
import { store } from "@/store/store";

const putPdfToDownload = async ({
  name,
  pdfFn,
  vacation,
}: CreatePdfParams): Promise<void> => {
  store.dispatch("startLoading");

  const pdfDoc = await PDFDocument.create();
  await pdfFn({ document: pdfDoc, vacation });
  const pdfBytes = await pdfDoc.save();
  downloadjs(pdfBytes, name, "application/pdf");

  store.dispatch("stopLoading");
};

export { putPdfToDownload };
