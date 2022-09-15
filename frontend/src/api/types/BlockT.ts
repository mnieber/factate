export type BlockT = {
  type: 'example' | 'standard';
  id: string;
  title: string;
  text: string;
};

export type BlockByIdT = { [id: string]: BlockT };
