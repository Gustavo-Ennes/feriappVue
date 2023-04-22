import type { PdfFnParam } from "@/pdf/types";
import type { Worker } from "@/routes/workers/types";
import { drawJustificationBlock } from "./block";


const render = async ({ document, instance }: PdfFnParam): Promise<void> => {
  if (document) {
    const page = document.addPage();
    const height = {
      actual: page.getHeight() - 80,
      stepLine() {
        this.actual -= 20;
      },
      stepSmallLine(){
        this.actual -=12
      },
      stepHugeLine() {
        this.actual -= 28;
      },
    };
    await drawJustificationBlock({
      document,
      height,
      worker: instance as Worker,
    });
    await drawJustificationBlock({
      document,
      height,
      worker: instance as Worker,
    });
    await drawJustificationBlock({
      document,
      height,
      worker: instance as Worker,
    });
    await drawJustificationBlock({
      document,
      height,
      worker: instance as Worker,
    });
  }
};

export { render };
