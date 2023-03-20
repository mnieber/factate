import { BackwardArrowIcon } from 'frames/icons/BackwardArrowIcon';
import { observer } from 'mobx-react-lite';
import { cn } from 'src/utils/classnames';
import './BackButton.scss';

export type PropsT = {
  onClick?: Function;
  className?: any;
};

export const BackButton = observer((props: PropsT) => {
  return (
    <div
      className={cn('BackButton', props.className)}
      onClick={() => props.onClick && props.onClick()}
    >
      <BackwardArrowIcon />
    </div>
  );
});
