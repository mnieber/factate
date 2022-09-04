import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withDefaultProps } from 'react-default-props-context';
import { TermT } from 'src/api/types/TermT';
import { TermListViewItem } from 'src/terms/components';
import { cn } from 'src/utils/classnames';
import './TermListView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  terms: TermT[];
  termsRS: string;
};

export const TermListView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.termsRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    const termDivs = R.pipe(
      R.always(props.terms),
      R.map((term: TermT) => {
        return <TermListViewItem key={term.id} term={term} />;
      })
    )();

    const noItems = <h2>There are no terms</h2>;

    return (
      <div className={cn('TermListView', 'flex flex-col', props.className)}>
        {termDivs.length > 0 && termDivs}
        {termDivs.length === 0 && noItems}
      </div>
    );
  })
);
