import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { ExampleT } from 'src/api/types/ExampleT';
import { PageT } from 'src/api/types/PageT';
import { SectionT } from 'src/api/types/SectionT';
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

    const exampleViews = props.page.sections.map((section: SectionT) => {
      if (section.type === 'example') {
        return (
          <ExampleView
            className={cn('p-4')}
            key={section.id}
            example={section as ExampleT}
          />
        );
      }
      return (
        <SectionView className={cn('p-4')} key={section.id} section={section} />
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
