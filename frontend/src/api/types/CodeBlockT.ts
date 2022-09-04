import { SnippetT } from 'src/api/types/SnippetT';

export type CodeBlockT = {
  id: string;
  filename: string;
  snippet: SnippetT;
};

export type CodeBlockByIdT = { [id: string]: CodeBlockT };
