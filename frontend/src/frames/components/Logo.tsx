import { observer } from 'mobx-react-lite';
import { withDefaultProps } from 'react-default-props-context';
import { cn } from 'src/utils/classnames';
import './Logo.scss';

type PropsT = {
  className?: any;
};

type DefaultPropsT = {};

export const Logo = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    return (
      <div
        className={cn('Logo', 'flex flex-col w-full', props.className)}
      ></div>
    );
  })
);
