import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { BlockT } from 'src/api/types/BlockT';
import { ExampleT } from 'src/api/types/ExampleT';
import { PageT } from 'src/api/types/PageT';
import { ExampleView } from 'src/examples/components';
import { SectionView } from 'src/examples/components/SectionView';
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

    const exampleViews = props.page.blocks.map((block: BlockT) => {
      if (block.type === 'example') {
        return (
          <ExampleView
            className={cn('p-4')}
            key={block.id}
            example={block as ExampleT}
          />
        );
      }
      return (
        <SectionView className={cn('p-4')} key={block.id} section={block} />
      );
    });

    return (
      <div className={cn('PageView', 'flex flex-col w-full', props.className)}>
        <div className="PageView__TopPanel">{exampleViews}</div>
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
