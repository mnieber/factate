export type CodeBlockT = {
  id: string;
  filename: string;
  code: string;
};

export type CodeBlockByIdT = { [id: string]: CodeBlockT };
