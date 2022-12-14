import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { data, input } from 'skandha';
import { GlossaryByIdT, GlossaryT } from 'src/api/types/GlossaryT';
import { PagesState, PropsT } from 'src/pages/PagesState';
import { listToItemById } from 'src/utils/ids';

export const initGlossaries = (state: PagesState, props: PropsT) => {
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(state.glossaries));
};

export class GlossariesData {
  @input glossaries: Array<GlossaryT> = [];

  @data get glossaryById(): GlossaryByIdT {
    return listToItemById(this.glossaries);
  }

  static className = () => 'Data';
}
