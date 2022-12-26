import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import ReactMarkdown from 'react-markdown';
import { createTitle, SectionT } from 'src/api/types/SectionT';
import { cn } from 'src/utils/classnames';
import './SectionView.scss';

type PropsT = {
  section: SectionT;
  className?: any;
};

const DefaultProps = {};

export const SectionView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('SectionView', 'flex flex-col', props.className)}>
        <ReactMarkdown
          className={cn('SectionView__Text', 'Markdown')}
          children={createTitle(props.section) + props.section.text}
        />
      </div>
    );
  }, DefaultProps)
);
