import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import {
  NestedDefaultPropsProvider,
  withDefaultProps,
} from 'react-default-props-context';
import { getPages } from 'src/api/queries/getPages';
import { PageT } from 'src/api/types/PageT';
import { PageState } from 'src/pages/PageState';

type PropsT = React.PropsWithChildren<{}>;

type DefaultPropsT = {};

export const PageStateProvider = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const [state] = React.useState(() => new PageState({}));

    React.useEffect(() => {
      getPages()
        .then((pages: PageT[]) => {
          state.setPages(pages);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }, [state]);

    const getDefaultProps = () => {
      return R.mergeAll([
        {
          pages: () => state.outputs.pagesDisplay,
          pagesHighlight: () => state.pages.highlight,
          page: () => state.pages.highlight.item,
        },
        {
          snippets: () => state.outputs.snippetsDisplay,
          snippetsHighlight: () => state.snippets.highlight,
          snippet: () => state.snippets.highlight.item,
        },
        {
          codeBlocks: () => state.outputs.codeBlocksDisplay,
          codeBlocksHighlight: () => state.codeBlocks.highlight,
          codeBlock: () => state.codeBlocks.highlight.item,
        },
        {
          facts: () => state.outputs.factsDisplay,
          factsHighlight: () => state.facts.highlight,
          fact: () => state.facts.highlight.item,
        },
      ]);
    };

    return (
      <NestedDefaultPropsProvider value={getDefaultProps()}>
        {props.children}
      </NestedDefaultPropsProvider>
    );
  })
);
