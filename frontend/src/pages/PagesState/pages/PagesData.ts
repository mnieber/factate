import { data, input } from 'skandha';
import { PageByIdT, PageT } from 'src/api/types/PageT';
import { listToItemById } from 'src/utils/ids';

export class PagesData {
  @input pages: Array<PageT> = [];

  @data get pageById(): PageByIdT {
    return listToItemById(this.pages);
  }

  static className = () => 'Data';
}
