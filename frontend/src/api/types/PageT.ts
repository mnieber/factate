import { SnippetT } from 'src/api/types/SnippetT';

export type PageT = {
  id: string;
  name: string;
  snippetSet: SnippetT[];
};

export type PageByIdT = { [id: string]: PageT };