import { BlockT } from 'src/api/types/BlockT';

export type PageT = {
  id: string;
  name: string;
  blocks: BlockT[];
};

export type PageByIdT = { [id: string]: PageT };
