import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import { PageState, PropsT } from 'src/pages/PageState';

export const initCodeBlocks = (state: PageState, props: PropsT) => {
  addCleanUpFunctionToCtr(this, () => cleanUpCtr(state.codeBlocks));
};
