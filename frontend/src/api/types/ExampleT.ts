import { BlockT } from 'src/api/types/BlockT';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { FactT } from 'src/api/types/FactT';

export type ExampleT = BlockT & {
  codeBlocks: CodeBlockT[];
  facts: FactT[];
};

export type ExampleByIdT = { [id: string]: ExampleT };
