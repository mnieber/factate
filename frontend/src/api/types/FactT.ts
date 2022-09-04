import { SnippetT } from 'src/api/types/SnippetT';

export type FactT = {
  id: string;
  title: string;
  snippet: SnippetT;
};

export type FactByIdT = { [id: string]: FactT };
