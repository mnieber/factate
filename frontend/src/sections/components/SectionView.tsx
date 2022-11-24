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

type DefaultPropsT = {
  pagesRS: string;
};

export const SectionView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
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
  })
);
