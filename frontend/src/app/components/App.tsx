import { FrameStateProvider } from 'src/frames/components/FrameStateProvider';
import { PageStateProvider } from 'src/pages/components/PageStateProvider';
import { UrlRouter } from 'src/routes/components';
import { cn } from 'src/utils/classnames';
import './App.scss';

export const App = () => {
  return (
    <div
      className={cn('App', 'flex flex-col items-center', 'mx-auto xl:w-4/5')}
    >
      <FrameStateProvider>
        <PageStateProvider>
          <UrlRouter />
        </PageStateProvider>
      </FrameStateProvider>
    </div>
  );
};
