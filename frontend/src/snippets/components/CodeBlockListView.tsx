import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { withDefaultProps } from 'react-default-props-context';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { CodeBlockListViewItem } from 'src/snippets/components';
import { cn } from 'src/utils/classnames';
import './CodeBlockListView.scss';

type PropsT = {
  className?: any;
  codeBlocks: CodeBlockT[];
};

type DefaultPropsT = {
  pagesRS: string;
};

export const CodeBlockListView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const resourceView = props.pagesRS === 'loading' ? <div /> : undefined;
    if (resourceView) return resourceView;

    const codeBlockDivs = R.pipe(
      R.always(props.codeBlocks),
      R.map((codeBlock: CodeBlockT) => {
        return (
          <CodeBlockListViewItem key={codeBlock.id} codeBlock={codeBlock} />
        );
      })
    )();

    const noItems = <h2>There are no codeBlocks</h2>;

    return (
      <div
        className={cn('CodeBlockListView', 'flex flex-col', props.className)}
      >
        {codeBlockDivs.length > 0 && codeBlockDivs}
        {codeBlockDivs.length === 0 && noItems}
      </div>
    );
  })
);
