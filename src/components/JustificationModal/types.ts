import type { Modal } from "bootstrap";

import type { Worker } from "@/routes/workers/types";

type JustificationModalData = {
  selectedWorker: Worker | null;
  workers: Worker[] | null;
  modal?: Modal;
};

export type { JustificationModalData };
