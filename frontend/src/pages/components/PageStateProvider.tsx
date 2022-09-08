import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import {
  NestedDefaultPropsProvider,
  withDefaultProps,
} from 'react-default-props-context';
import { getPages } from 'src/api/queries/getPages';
import { PageT } from 'src/api/types/PageT';
import { SnippetT } from 'src/api/types/SnippetT';
import { PageState } from 'src/pages/PageState';
import { ObjT } from 'src/utils/types';

type PropsT = React.PropsWithChildren<{}>;

type DefaultPropsT = {};

export const PageStateProvider = observer(
  withDefaultProps<PropsT, DefaultPropsT>((props: PropsT & DefaultPropsT) => {
    const [state] = React.useState(() => new PageState({}));

    React.useEffect(() => {
      getPages()
        .then((pages: ObjT) => {
          state.setPages(pages.pages);
          state.pages.highlight.highlightItem(pages.pages[0]?.id);

          const page: PageT | undefined = state.pages.highlight.item;
          state.snippets.highlight.highlightItem(page?.snippets[0]?.id);

          const snippet: SnippetT | undefined = state.snippets.highlight.item;
          state.facts.highlight.highlightItem(snippet?.facts[0]?.id);
          state.codeBlocks.highlight.highlightItem(snippet?.codeBlocks[0]?.id);
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
          pagesRS: () => (state.inputs.pages.length ? 'loaded' : 'loading'),
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
        {
          terms: () => [],
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
