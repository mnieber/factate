import { input, output } from 'skandha';
import { PageByIdT, PageT } from 'src/api/types/PageT';
import { listToItemById } from 'src/utils/ids';

export class PagesData {
  static className = () => 'PagesData';

  @input pages: Array<PageT> = [];

  @output get pageById(): PageByIdT {
    return listToItemById(this.pages);
  }
}
