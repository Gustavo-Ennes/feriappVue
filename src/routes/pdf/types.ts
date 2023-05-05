export type PdfDataParams = {
  buffer?: string;
  params: Params;
};

export type Params = {
  _id?: string | string[];
  type?: string | string[];
};

export type Height = {
  actual: number;
  stepLine: () => void;
  stepHugeLine: () => void;
  stepSmallLine: () => void;
};
