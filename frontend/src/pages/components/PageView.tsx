import { observer } from 'mobx-react-lite';
import { stub, withDefaultProps } from 'react-default-props-context';
import { PageT } from 'src/api/types/PageT';
import 'src/frames/styles/uikit.scss';
import { GlossariesPanel } from 'src/glossaries/components';
import {
  useOnKeyDownScrollToHeading,
  useOnScrollFocusFactCard,
} from 'src/pages/hooks';
import { useIsVisible } from 'src/pages/hooks/useIsVisible';
import { SectionsPanel } from 'src/sections/components/SectionsPanel';
import { cn } from 'src/utils/classnames';
import UIkit from 'uikit';
import './PageView.scss';

type PropsT = {
  className?: any;
};

const DefaultProps = {
  page: stub as PageT,
  isMobile: stub as boolean,
};

export const PageView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const { isVisible, ref } = useIsVisible();
    const { onScrollFocusFactCard } = useOnScrollFocusFactCard({
      elm: ref.current,
      isVisible,
    });
    const { onKeyDownScrollToHeading } = useOnKeyDownScrollToHeading({
      elm: ref.current,
      isVisible,
    });

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
              ref={(x: any) => {
                ref.current = x;
              }}
              tabIndex={123}
              className={cn('PageView__LeftPanel', 'grow')}
              onScroll={onScrollFocusFactCard}
              onKeyDown={onKeyDownScrollToHeading}
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
