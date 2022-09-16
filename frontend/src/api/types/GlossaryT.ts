import { TermT } from 'src/api/types/TermT';

export type GlossaryT = {
  id: string;
  name: string;
  terms: TermT[];
};
