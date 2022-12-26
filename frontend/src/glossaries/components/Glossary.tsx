import { observer } from 'mobx-react-lite';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { TermT } from 'src/api/types/TermT';
import { withDefaultProps } from 'src/app/defaultProps';
import { GlossaryItem } from 'src/glossaries/components/GlossaryItem';
import { cn } from 'src/utils/classnames';
import './Glossary.scss';

type PropsT = {
  className?: any;
  glossary: GlossaryT;
};

const DefaultProps = {};

export const Glossary = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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
