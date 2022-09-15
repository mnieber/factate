import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { FactT } from 'src/api/types/FactT';

export type ExampleT = {
  id: string;
  title: string;
  text: string;
  codeBlocks: CodeBlockT[];
  facts: FactT[];
};

export type ExampleByIdT = { [id: string]: ExampleT };
