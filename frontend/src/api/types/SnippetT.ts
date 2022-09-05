import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { FactT } from 'src/api/types/FactT';
import { PageT } from 'src/api/types/PageT';

export type SnippetT = {
  id: string;
  title: string;
  page: PageT;
  codeBlockSet: CodeBlockT[];
  factSet: FactT[];
};

export type SnippetByIdT = { [id: string]: SnippetT };
