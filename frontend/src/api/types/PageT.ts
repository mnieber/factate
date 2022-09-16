import { SectionT } from 'src/api/types/SectionT';

export type PageT = {
  id: string;
  name: string;
  sections: SectionT[];
};

export type PageByIdT = { [id: string]: PageT };
