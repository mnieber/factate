import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { PagesState, PropsT } from 'src/pages/PagesState';

export const initGlossaries = (state: PagesState, props: PropsT) => {
  const ctr = state.glossaries;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};
