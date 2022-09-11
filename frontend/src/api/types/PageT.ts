import { ExampleT } from 'src/api/types/ExampleT';

export type PageT = {
  id: string;
  name: string;
  examples: ExampleT[];
};

export type PageByIdT = { [id: string]: PageT };
