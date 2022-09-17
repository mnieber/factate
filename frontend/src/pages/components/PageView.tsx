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
import 'src/frames/styles/uikit.scss';
import { areRectanglesIntersecting } from 'src/frames/utils/areRectanglesIntersecting';
import { findNextElm } from 'src/frames/utils/handleEnterAsTabToNext';
import { scrollToNextHeading } from 'src/frames/utils/scrollToNextHeading';
import { Glossary } from 'src/glossaries/components/Glossary';
import { cn } from 'src/utils/classnames';
import UIkit from 'uikit';
import './PageView.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {
  page: PageT;
  glossaries: GlossaryT[];
  isMobile: boolean;
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
      []
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

    console.log(
      '🚀 ~ file: PageView.tsx ~ line 68 ~ props.isMobile',
      props.isMobile
    );
    const menu = props.isMobile ? (
      <button data-uk-toggle="target: #PageView__RightPanel" type="button">
        Menu
      </button>
    ) : null;

    const rightPanel = props.isMobile ? (
      <div
        id="PageView__RightPanel"
        ref={(elm: any) => {
          UIkit.offcanvas(elm, { flip: true });
        }}
      >
        <div className="uk-offcanvas-bar">{glossaryViews}</div>
      </div>
    ) : (
      <div className={cn('PageView__RightPanel')}>{glossaryViews}</div>
    );

    return (
      UIkit && (
        <div
          className={cn(
            'PageView',
            'flex flex-col',
            'w-full grow',
            props.className
          )}
        >
          {menu}
          <div className={cn('PageView__Body', 'flex flex-row', 'w-full grow')}>
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
              <div className={cn('PageView__Sections')}>
                {sectionViews}
                <div className={cn('PageView__Credits', 'px-4')}>
                  Documentation created with{' '}
                  <a href="https://github.com/mnieber/factate">factate</a>
                </div>
              </div>
            </div>
            {rightPanel}
          </div>
        </div>
      )
    );
  })
);
