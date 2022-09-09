import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { SnippetT } from 'src/api/types/SnippetT';
import { FactListView } from 'src/facts/components';
import { CodeBlockListView } from 'src/snippets/components/CodeBlockListView';
import { cn } from 'src/utils/classnames';
import './SnippetView.scss';

type PropsT = {
  snippet: SnippetT;
  className?: any;
};

type DefaultPropsT = {
  pagesRS: string;
};

export const SnippetView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    return (
      <div className={cn('SmippetView', 'flex flex-col', props.className)}>
        <div className="SnippetView__Title">{props.snippet.title}</div>
        <CodeBlockListView codeBlocks={props.snippet.codeBlocks} />
        <FactListView facts={props.snippet.facts} />
      </div>
    );
  })
);
