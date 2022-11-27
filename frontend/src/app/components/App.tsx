import { FrameStateProvider } from 'src/frames/components/FrameStateProvider';
import { PageStateProvider } from 'src/pages/components/PageStateProvider';
import { UrlRouter } from 'src/routes/components';
import { cn } from 'src/utils/classnames';
import './App.scss';

export const App = () => {
  return (
    <FrameStateProvider>
      <PageStateProvider>
        <div className={cn('App', 'flex flex-col', 'mx-auto xl:w-4/5')}>
          <UrlRouter />
        </div>
      </PageStateProvider>
    </FrameStateProvider>
  );
};
