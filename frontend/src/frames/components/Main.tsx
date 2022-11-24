import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { cn } from 'src/utils/classnames';
import './Main.scss';

type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const Main = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div
        className={cn('Main', 'flex flex-col w-full', props.className)}
      ></div>
    );
  }, DefaultProps)
);
