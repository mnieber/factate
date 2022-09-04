import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withDefaultProps } from 'react-default-props-context';
import { FactT } from 'src/api/types/FactT';
import { FactListViewItem } from 'src/facts/components';
import { cn } from 'src/utils/classnames';
import './FactListView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  facts: FactT[];
  factsRS: string;
};

export const FactListView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.factsRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    const factDivs = R.pipe(
      R.always(props.facts),
      R.map((fact: FactT) => {
        return <FactListViewItem key={fact.id} fact={fact} />;
      })
    )();

    const noItems = <h2>There are no facts</h2>;

    return (
      <div className={cn('FactListView', 'flex flex-col', props.className)}>
        {factDivs.length > 0 && factDivs}
        {factDivs.length === 0 && noItems}
      </div>
    );
  })
);
