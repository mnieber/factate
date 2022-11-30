import { stub } from 'react-default-props-context';
import { PageT } from 'src/api/types/PageT';
export { stub, withDefaultProps } from 'react-default-props-context';

export const defaultProps = {
  page: {
    page: stub as PageT,
  },
};
