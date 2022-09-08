import { data, output } from 'skandha';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { FactT } from 'src/api/types/FactT';
import { PageByIdT, PageT } from 'src/api/types/PageT';
import { SnippetT } from 'src/api/types/SnippetT';
import { listToItemById } from 'src/utils/ids';

export class Outputs {
  @output pagesDisplay: Array<PageT> = [];
  @output snippetsDisplay: Array<SnippetT> = [];
  @output factsDisplay: Array<FactT> = [];
  @output codeBlocksDisplay: Array<CodeBlockT> = [];

  @data get pageById(): PageByIdT {
    return listToItemById(this.pagesDisplay);
  }

  static className = () => 'Outputs';
}
