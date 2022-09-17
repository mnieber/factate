import jQuery from 'jquery';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import { ExampleT } from 'src/api/types/ExampleT';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { PageT } from 'src/api/types/PageT';
import { SectionT } from 'src/api/types/SectionT';
import { ExampleView } from 'src/examples/components';
import { SectionView } from 'src/examples/components/SectionView';
import { areRectanglesIntersecting } from 'src/frames/utils/areRectanglesIntersecting';
import { findNextElm } from 'src/frames/utils/handleEnterAsTabToNext';
import { scrollToNextHeading } from 'src/frames/utils/scrollToNextHeading';
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
    const ref = React.useRef<any>(null);
    const [scrollPos, setScrollPos] = React.useState<number>(-1);
    const isVisible = React.useMemo(
      () => (elm: any) => {
        return areRectanglesIntersecting(
          elm.getBoundingClientRect(),
          ref.current.getBoundingClientRect()
        );
      },
      [ref.current]
    );

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
        <div
          ref={ref}
          tabIndex={123}
          className={cn('PageView__LeftPanel', 'grow')}
          onScroll={(e: any) => {
            if (ref.current) {
              const newScrollPos = ref.current.scrollTop;
              const isDown = newScrollPos < scrollPos;
              setScrollPos(newScrollPos);

              const focusedFactCard = jQuery('.FactCard:focus')[0];
              if (focusedFactCard && !isVisible(focusedFactCard)) {
                const nextFactCard = findNextElm(
                  focusedFactCard,
                  '.FactCard',
                  !isDown
                );
                if (nextFactCard && isVisible(nextFactCard)) {
                  nextFactCard?.focus({ preventScroll: true });
                }
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.ctrlKey && !e.shiftKey && e.key === 'ArrowDown') {
              e.preventDefault();
              scrollToNextHeading(ref.current, isVisible, true);
            }
            if (e.ctrlKey && !e.shiftKey && e.key === 'ArrowUp') {
              e.preventDefault();
              scrollToNextHeading(ref.current, isVisible, false);
            }
          }}
        >
          <div className={cn('PageView__Sections')}>{sectionViews}</div>
        </div>
        <div className={cn('PageView__RightPanel')}>{glossaryViews}</div>
      </div>
    );
  })
);
