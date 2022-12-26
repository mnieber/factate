import { observer } from 'mobx-react-lite';
import { BackwardArrowIcon } from 'src/frames/icons/BackwardArrowIcon';
import { cn } from 'src/utils/classnames';

export type PropsT = {
  onClick: Function;
  className?: any;
};

export const BackButton = observer((props: PropsT) => {
  return (
    <div
      className={cn('BackButton', props.className)}
      onClick={props.onClick as any}
    >
      <BackwardArrowIcon />
    </div>
  );
});
