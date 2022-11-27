import { observer } from 'mobx-react-lite';
import { stub, withDefaultProps } from 'react-default-props-context';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { Glossary } from 'src/glossaries/components/Glossary';
import { cn } from 'src/utils/classnames';
import UIkit from 'uikit';
import './GlossariesPanel.scss';

type PropsT = {
  className?: any;
};

const DefaultProps = {
  glossaries: stub as GlossaryT[],
  isMobile: stub as boolean,
};

export const GlossariesPanel = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const glossaries = props.glossaries.map((glossary: GlossaryT) => {
      return (
        <Glossary className={cn()} key={glossary.id} glossary={glossary} />
      );
    });

    return UIkit && props.isMobile ? (
      <div
        id="GlossariesPanel"
        ref={(elm: any) => {
          UIkit.offcanvas(elm, { flip: true });
        }}
      >
        <div className={cn('uk-offcanvas-bar', 'mt-[-16px]')}>{glossaries}</div>
      </div>
    ) : (
      <div className={cn('GlossariesPanel', 'flex flex-col')}>{glossaries}</div>
    );
  }, DefaultProps)
);
