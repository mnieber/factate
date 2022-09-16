import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { FactT } from 'src/api/types/FactT';
import { SectionT } from 'src/api/types/SectionT';

export type ExampleT = SectionT & {
  codeBlocks: CodeBlockT[];
  facts: FactT[];
};

export type ExampleByIdT = { [id: string]: ExampleT };
