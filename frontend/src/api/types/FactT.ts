export type FactT = {
  id: string;
  title: string;
  text: string;
};

export type FactByIdT = { [id: string]: FactT };
