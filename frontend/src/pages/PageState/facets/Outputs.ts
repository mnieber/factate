import { data, output } from 'skandha';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { ExampleT } from 'src/api/types/ExampleT';
import { FactT } from 'src/api/types/FactT';
import { PageByIdT, PageT } from 'src/api/types/PageT';
import { listToItemById } from 'src/utils/ids';

export class Outputs {
  @output pagesDisplay: Array<PageT> = [];
  @output examplesDisplay: Array<ExampleT> = [];
  @output factsDisplay: Array<FactT> = [];
  @output codeBlocksDisplay: Array<CodeBlockT> = [];

  @data get pageById(): PageByIdT {
    return listToItemById(this.pagesDisplay);
  }

  static className = () => 'Outputs';
}
