import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { PageState, PropsT } from 'src/pages/PageState';

export const initFacts = (state: PageState, props: PropsT) => {
  addCleanUpFunctionToCtr(state, () => cleanUpCtr(state.facts));
};
