import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { data, input } from 'skandha';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { PageByIdT, PageT } from 'src/api/types/PageT';
import { PagesState, PropsT } from 'src/pages/PagesState';
import { listToItemById } from 'src/utils/ids';

export const initPages = (state: PagesState, props: PropsT) => {
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(state.pages));
};

export class PagesData {
  @input pages: Array<PageT> = [];
  @input glossaries: Array<GlossaryT> = [];

  @data get pageById(): PageByIdT {
    return listToItemById(this.pages);
  }

  static className = () => 'Data';
}
