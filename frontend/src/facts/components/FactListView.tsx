import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { FactT } from 'src/api/types/FactT';
import { FactCard } from 'src/facts/components';
import './FactListView.scss';

type PropsT = {
  className?: any;
  facts: FactT[];
};

type DefaultPropsT = {
  pagesRS: string;
};

export const FactListView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    return <FactCard fact={props.facts[props.facts.length - 1]} />;
  })
);
