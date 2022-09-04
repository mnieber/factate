import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { SnippetT } from 'src/api/types/SnippetT';
import { cn } from 'src/utils/classnames';
import './SnippetView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  snippet: SnippetT;
};

export const SnippetView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div className={cn('SmippetView', 'flex flex-col', props.className)}>
        Snippet
      </div>
    );
  })
);
