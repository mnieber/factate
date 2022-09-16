import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withDefaultProps } from 'react-default-props-context';
import { TermT } from 'src/api/types/TermT';
import { GlossaryItem } from 'src/terms/components/GlossaryItem';
import { cn } from 'src/utils/classnames';
import './Glossary.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  terms: TermT[];
  pagesRS: string;
};

export const Glossary = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    const itemDivs = R.pipe(
      R.always(props.terms),
      R.map((term: TermT) => {
        return <GlossaryItem key={term.id} term={term} />;
      })
    )();

    const noItems = <h2>There are no terms</h2>;

    return (
      <div className={cn('Glossary', 'flex flex-col', props.className)}>
        <div className={cn('Glossary__Title', 'my-4')}>Glossary</div>
        {itemDivs.length > 0 && itemDivs}
        {itemDivs.length === 0 && noItems}
      </div>
    );
  })
);
