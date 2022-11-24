export type CodeBlockT = {
  code: string;
  filename: string;
  id: string;
};

export type CodeBlockByIdT = { [id: string]: CodeBlockT };
