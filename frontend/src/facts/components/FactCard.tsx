import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from 'react-default-props-context';
import ReactMarkdown from 'react-markdown';
import { FactT } from 'src/api/types/FactT';
import { ButtonBack } from 'src/facts/components/ButtonBack';
import { ButtonForward } from 'src/facts/components/ButtonForward';
import { cn } from 'src/utils/classnames';
import './FactCard.scss';

export type PropsT = {
  className?: any;
  facts: FactT[];
};

type DefaultPropsT = {};

export const FactCard: React.FC<PropsT> = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const [factIdx, setFactIdx] = React.useState(0);
    if (!props.facts.length) return null;

    const moveBack = React.useCallback(
      () => setFactIdx(factIdx > 0 ? factIdx - 1 : props.facts.length - 1),
      [factIdx, setFactIdx]
    );

    const moveForward = React.useCallback(
      () => setFactIdx(factIdx < props.facts.length - 1 ? factIdx + 1 : 0),
      [factIdx, setFactIdx]
    );

    const factDivs = props.facts.map((fact, idx) => {
      return (
        <div
          className={cn(
            'FactCard__Content',
            idx === factIdx ? 'visible' : 'invisible'
          )}
        >
          <div
            className={cn(
              'FactCard__Title',
              'flex flex-row justify-between',
              'mb-3'
            )}
          >
            <ButtonBack onClick={moveBack} />
            <div className="mx-2">{fact.title}</div>
            <ButtonForward onClick={moveForward} />
          </div>
          <ReactMarkdown
            className={cn('FactCard__Text')}
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
            children={fact.text}
          />
        </div>
      );
    });

    const dotNavDivs = props.facts.map((fact, idx) => {
      return (
        <div className={cn(idx == factIdx ? 'uk-active' : '')} key={fact.id}>
          <div></div>
        </div>
      );
    });

    return (
      <div className={cn('FactCard', 'flex flex-col', 'p-4', props.className)}>
        <div className={cn('FactCard__Body')}>{factDivs}</div>
        <ul className={cn('uk-dotnav', 'mt-2', 'self-center')}>{dotNavDivs}</ul>
      </div>
    );
  })
);
