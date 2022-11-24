import { observer } from 'mobx-react-lite';
import { stub, withDefaultProps } from 'react-default-props-context';
import ReactMarkdown from 'react-markdown';
import { createTitle, SectionT } from 'src/api/types/SectionT';
import { cn } from 'src/utils/classnames';
import './SectionView.scss';

type PropsT = {
  section: SectionT;
  className?: any;
};

const DefaultProps = {
  pagesRS: stub as string,
};

export const SectionView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

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
