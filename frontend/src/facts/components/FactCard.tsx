import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import { ExampleT } from 'src/api/types/ExampleT';
import { BackButton } from 'src/facts/components/BackButton';
import { FactMarkdown } from 'src/facts/components/FactMarkdown';
import { ForwardButton } from 'src/facts/components/ForwardButton';
import { cn } from 'src/utils/classnames';
import { useRingIdx } from 'src/utils/hooks/useRingIdx';
import './FactCard.scss';

export type PropsT = {
  example: ExampleT;
  className?: any;
};

export const FactCard = observer((props: PropsT) => {
  const {
    idx: factIdx,
    incIdx: incFactIdx,
    decIdx: decFactIdx,
    length,
  } = useRingIdx(props.example?.facts.length);
  if (!length) return null;

  const factDivs = props.example?.facts.map((fact, idx) => {
    return (
      <div
        key={fact.id}
        className={cn(
          'FactCard__Content',
          idx === factIdx ? 'visible' : 'invisible'
        )}
      >
        <div
          className={cn(
            'FactCard__ContentBar',
            'flex flex-row justify-between',
            'mb-3'
          )}
        >
          <BackButton onClick={decFactIdx} />
          <div className="mx-2">{fact.title}</div>
          <ForwardButton onClick={incFactIdx} />
        </div>
        <FactMarkdown fact={fact} />
      </div>
    );
  });

  const dotNavDivs = props.example.facts.map((fact, idx) => {
    return (
      <div className={cn(idx === factIdx ? 'uk-active' : '')} key={fact.id}>
        <div></div>
      </div>
    );
  });

  return (
    <div
      className={cn('FactCard', 'flex flex-col', 'p-4', props.className)}
      tabIndex={123}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') R.T(e.preventDefault()) && decFactIdx();
        if (e.key === 'ArrowRight') R.T(e.preventDefault()) && incFactIdx();
      }}
    >
      <div className={cn('FactCard__Body')}>{factDivs}</div>
      <ul className={cn('uk-dotnav', 'mt-2', 'self-center')}>{dotNavDivs}</ul>
    </div>
  );
});
