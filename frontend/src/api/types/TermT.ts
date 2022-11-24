export type TermT = {
  definition: string;
  id: string;
  name: string;
};

export type TermByIdT = { [id: string]: TermT };
