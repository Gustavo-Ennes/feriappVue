export type PdfDataParams = {
  buffer?: string;
  params: Params;
};

export type Params = {
  _id?: string | string[];
  type?: string;
  reference?: Date;
  justification?: string;
  period?: string;
  vacationType?: string;
};

export type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
  stepSmallLine: () => void;
};
