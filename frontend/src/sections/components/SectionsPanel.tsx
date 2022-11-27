import { observer } from 'mobx-react-lite';
import { stub, withDefaultProps } from 'react-default-props-context';
import { ExampleT } from 'src/api/types/ExampleT';
import { PageT } from 'src/api/types/PageT';
import { SectionT } from 'src/api/types/SectionT';
import { ExampleView } from 'src/sections/components/ExampleView';
import { SectionView } from 'src/sections/components/SectionView';
import { cn } from 'src/utils/classnames';
import './SectionsPanel.scss';

type PropsT = {
  className?: any;
};

const DefaultProps = {
  page: stub as PageT,
};

export const SectionsPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const sectionViews = props.page.sections.map((section: SectionT) => {
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
      <div className={cn('SectionsPanel')}>
        {sectionViews}
        <div className={cn('PageView__Credits', 'px-4')}>
          Documentation created with{' '}
          <a href="https://github.com/mnieber/factate">factate</a>
        </div>
      </div>
    );
  }, DefaultProps)
);
