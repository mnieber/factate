export type FactT = {
  id: string;
  text: string;
  title: string;
};

export type FactByIdT = { [id: string]: FactT };
