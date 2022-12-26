import { observer } from 'mobx-react-lite';
import ReactMarkdown from 'react-markdown';
import { CodeBlockT } from 'src/api/types/CodeBlockT';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import './CodeBlockCard.scss';

export type PropsT = {
  codeBlock: CodeBlockT;
  className?: any;
};

const DefaultProps = {};

export const CodeBlockCard = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <div className={cn('CodeBlockCard', props.className)}>
        <ReactMarkdown
          className={cn('CodeBlockCard__Code')}
          children={props.codeBlock.code}
        />
      </div>
    );
  }, DefaultProps)
);
