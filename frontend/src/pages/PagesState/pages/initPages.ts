import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { PagesState, PropsT } from 'src/pages/PagesState';

export const initPages = (state: PagesState, props: PropsT) => {
  const ctr = state.pages;
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(ctr));
};
