import { scrollToNextHeading } from 'src/frames/utils/scrollToNextHeading';

type PropsT = {
  elm: any;
  isVisible: Function;
};

export const useOnKeyDownScrollToHeading = (props: PropsT) => {
  const onKeyDownScrollToHeading = (e: any) => {
    if (e.ctrlKey && !e.shiftKey && e.key === 'ArrowDown') {
      e.preventDefault();
      scrollToNextHeading(props.elm, props.isVisible, true);
    }
    if (e.ctrlKey && !e.shiftKey && e.key === 'ArrowUp') {
      e.preventDefault();
      scrollToNextHeading(props.elm, props.isVisible, false);
    }
  };
  return { onKeyDownScrollToHeading };
};
