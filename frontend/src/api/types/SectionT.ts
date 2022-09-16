export type SectionT = {
  type: 'example' | 'standard';
  id: string;
  title: string;
  text: string;
};

export type SectionByIdT = { [id: string]: SectionT };
