import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { FactT } from 'src/api/types/FactT';

export type SnippetT = {
  id: string;
  title: string;
  codeBlocks: CodeBlockT[];
  facts: FactT[];
};

export type SnippetByIdT = { [id: string]: SnippetT };
