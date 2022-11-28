import { FrameStateProvider } from 'src/frames/components/FrameStateProvider';
import { PagesStateProvider } from 'src/pages/components/PagesStateProvider';
import { UrlRouter } from 'src/routes/components';
import { cn } from 'src/utils/classnames';
import './App.scss';

export const App = () => {
  return (
    <FrameStateProvider>
      <PagesStateProvider>
        <div className={cn('App', 'flex flex-col', 'mx-auto xl:w-4/5')}>
          <UrlRouter />
        </div>
      </PagesStateProvider>
    </FrameStateProvider>
  );
};
