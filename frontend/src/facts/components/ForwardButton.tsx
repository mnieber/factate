import { ForwardArrowIcon } from 'src/frames/icons/ForwardArrowIcon';
import { observer } from 'mobx-react-lite';
import { cn } from 'src/utils/classnames';
import './ForwardButton.scss';

export type PropsT = {
  onClick?: Function;
  className?: any;
};

export const ForwardButton = observer((props: PropsT) => {
  return (
    <div
      className={cn('ForwardButton', props.className)}
      onClick={() => props.onClick && props.onClick()}
    >
      <ForwardArrowIcon />
    </div>
  );
});
