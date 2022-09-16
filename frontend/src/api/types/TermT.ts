export type TermT = {
  id: string;
  name: string;
  definition: string;
};

export type TermByIdT = { [id: string]: TermT };
