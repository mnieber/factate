import { SnippetT } from 'src/api/types/SnippetT';

export type PageT = {
  id: string;
  name: string;
  snippets: SnippetT[];
};

export type PageByIdT = { [id: string]: PageT };
