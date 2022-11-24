import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { stub, withDefaultProps } from 'react-default-props-context';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { TermT } from 'src/api/types/TermT';
import { GlossaryItem } from 'src/glossaries/components/GlossaryItem';
import { cn } from 'src/utils/classnames';
import './Glossary.scss';

type PropsT = {
  className?: any;
  glossary: GlossaryT;
};

const DefaultProps = {
  pagesRS: stub as string,
};

export const Glossary = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    const itemDivs = R.pipe(
      R.always(props.glossary.terms),
      R.map((term: TermT) => {
        return <GlossaryItem key={term.id} term={term} />;
      })
    )();

    const noItems = <h2>There are no glossary</h2>;
    const postFix = props.glossary.name ? ` (${props.glossary.name})` : '';

    return (
      <div className={cn('Glossary', 'flex flex-col', props.className)}>
        <div className={cn('Glossary__Title', 'my-4')}>
          {'Glossary' + postFix}
        </div>
        {itemDivs.length > 0 && itemDivs}
        {itemDivs.length === 0 && noItems}
      </div>
    );
  }, DefaultProps)
);
