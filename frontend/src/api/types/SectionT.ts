import { BlockT } from 'src/api/types/BlockT';

export type SectionT = BlockT & {};

export type SectionByIdT = { [id: string]: SectionT };
