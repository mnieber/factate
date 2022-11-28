import { observer } from 'mobx-react-lite';
import { stub, withDefaultProps } from 'src/app/defaultProps';
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

    const glossaryItems = props.glossary.terms.map((term: TermT) => {
      return <GlossaryItem key={term.id} term={term} />;
    });

    const postFix = props.glossary.name ? ` (${props.glossary.name})` : '';

    return (
      <div className={cn('Glossary', props.className)}>
        <div className={cn('Glossary__Title', 'my-4')}>
          {'Glossary' + postFix}
        </div>
        {glossaryItems}
      </div>
    );
  }, DefaultProps)
);
