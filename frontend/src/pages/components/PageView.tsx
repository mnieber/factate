import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { FactListView } from 'src/facts/components';
import { SnippetView } from 'src/snippets/components';
import { TermListView } from 'src/terms/components';
import { cn } from 'src/utils/classnames';
import './PageView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {};

export const PageView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div className={cn('PageView', 'flex flex-col w-full', props.className)}>
        <div className="PageView__TopPanel">
          <div>
            <SnippetView />
          </div>
        </div>
        <div className={cn('flex flex-row', props.className)}>
          <div className="PageView__RightPanel">
            <div>
              <TermListView />
            </div>
          </div>
        </div>
        <div className="PageView__BottomPanel">
          <div>
            <FactListView />
          </div>
        </div>
      </div>
    );
  })
);
