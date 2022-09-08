import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { FactT } from 'src/api/types/FactT';

export type SnippetT = {
  id: string;
  title: string;
  codeBlockSet: CodeBlockT[];
  factSet: FactT[];
};

export type SnippetByIdT = { [id: string]: SnippetT };
