import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { PageT } from 'src/api/types/PageT';
import { SnippetT } from 'src/api/types/SnippetT';
import { SnippetView } from 'src/snippets/components';
import { TermListView } from 'src/terms/components';
import { cn } from 'src/utils/classnames';
import './PageView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  page: PageT;
};

export const PageView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    if (!props.page) return null;

    const snippetViews = props.page.snippets.map((snippet: SnippetT) => {
      return (
        <SnippetView className={cn('p-4')} key={snippet.id} snippet={snippet} />
      );
    });

    return (
      <div className={cn('PageView', 'flex flex-col w-full', props.className)}>
        <div className="PageView__TopPanel">{snippetViews}</div>
        <div className={cn('flex flex-row', props.className)}>
          <div className="PageView__RightPanel">
            <div>
              <TermListView />
            </div>
          </div>
        </div>
      </div>
    );
  })
);
