import { observer } from 'mobx-react-lite';
import { FactT } from 'src/api/types/FactT';
import { withDefaultProps } from 'src/app/defaultProps';
import { cn } from 'src/utils/classnames';
import ReactMarkdown from 'react-markdown';
import './FactMarkdown.scss';

export type PropsT = {
  fact: FactT;
  className?: any;
};

const DefaultProps = {};

export const FactMarkdown = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    return (
      <ReactMarkdown
        className={cn('FactMarkdown')}
        components={{
          code({ node, inline, className, children, ...props }) {
            return inline ? (
              <span style={{ color: 'blue' }} {...props}>
                {children}
              </span>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
        children={props.fact.text}
      />
    );
  }, DefaultProps)
);
