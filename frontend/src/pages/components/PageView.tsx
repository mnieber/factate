import jQuery from 'jquery';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { stub, withDefaultProps } from 'react-default-props-context';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { PageT } from 'src/api/types/PageT';
import 'src/frames/styles/uikit.scss';
import { areRectanglesIntersecting } from 'src/frames/utils/areRectanglesIntersecting';
import { findNextElm } from 'src/frames/utils/handleEnterAsTabToNext';
import { scrollToNextHeading } from 'src/frames/utils/scrollToNextHeading';
import { GlossariesPanel } from 'src/glossaries/components';
import { SectionsPanel } from 'src/sections/components/SectionsPanel';
import { cn } from 'src/utils/classnames';
import UIkit from 'uikit';
import './PageView.scss';

type PropsT = {
  className?: any;
};

const DefaultProps = {
  page: stub as PageT,
  glossaries: stub as GlossaryT[],
  isMobile: stub as boolean,
};

export const PageView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
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

    const toggleMenuButton = props.isMobile ? (
      <button data-uk-toggle="target: #GlossariesPanel" type="button">
        Menu
      </button>
    ) : null;

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
          {toggleMenuButton}
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
              <SectionsPanel />
            </div>
            <GlossariesPanel />
          </div>
        </div>
      )
    );
  }, DefaultProps)
);
