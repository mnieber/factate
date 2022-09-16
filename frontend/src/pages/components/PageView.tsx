import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { ExampleT } from 'src/api/types/ExampleT';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { PageT } from 'src/api/types/PageT';
import { SectionT } from 'src/api/types/SectionT';
import { ExampleView } from 'src/examples/components';
import { SectionView } from 'src/examples/components/SectionView';
import { Glossary } from 'src/glossaries/components/Glossary';
import { cn } from 'src/utils/classnames';
import './PageView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  page: PageT;
  glossaries: GlossaryT[];
};

export const PageView = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    if (!props.page) return null;

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

    const glossaryViews = props.glossaries.map((glossary: GlossaryT) => {
      return (
        <Glossary className={cn()} key={glossary.id} glossary={glossary} />
      );
    });

    return (
      <div
        className={cn(
          'PageView',
          'flex flex-row',
          'w-full grow',
          props.className
        )}
      >
        <div className={cn('PageView__LeftPanel', 'grow')}>
          <div className={cn('PageView__Sections')}>{sectionViews}</div>
        </div>
        <div className={cn('PageView__RightPanel')}>{glossaryViews}</div>
      </div>
    );
  })
);
