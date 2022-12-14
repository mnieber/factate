import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import { NestedDefaultPropsContext } from 'react-default-props-context';
import { useGetPages } from 'src/api/queries';
import { initRS, maybe } from 'src/api/ResourceState';
import { withDefaultProps } from 'src/app/defaultProps';
import { flags } from 'src/app/flags';
import { useUpdateStateReaction } from 'src/frames/hooks/useUpdateStateReaction';
import { PagesState } from 'src/pages/PagesState';
import { log } from 'src/utils/logging';

export type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const PagesStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const getPages = useGetPages();

    const [state] = React.useState(() => new PagesState({}));

    useUpdateStateReaction({
      getInputs: () => {
        return {
          glossaries: getPages.data?.glossaries,
          pages: getPages.data?.pages,
        };
      },
      updateState: (inputs) => {
        R.forEach(initRS, inputs.glossaries ?? []);
        state.glossaries.data.glossaries = inputs.glossaries ?? [];

        R.forEach(initRS, inputs.pages ?? []);
        state.pages.data.pages = inputs.pages ?? [];
        if (state.pages.data.pages.length) {
          state.pages.highlight.highlightItem(state.pages.data.pages[0].id);
        }

        if (flags.logStateProviders) {
          log('PagesState updated', state.getSummary());
        }
      },
      destroyState: () => state.destroy(),
    });

    const getDefaultPropsContext = () => {
      const result: any = {
        defaultProps: {
          pagesState: () => state,
        },
      };

      result.defaultProps = {
        ...result.defaultProps,
        glossaries: () => maybe(getPages, [])(state.glossaries.data.glossaries),
      };

      result.defaultProps = {
        ...result.defaultProps,
        pages: () => maybe(getPages, [])(state.pages.data.pages),
        page: () => maybe(getPages)(state.pages.highlight.item),
        pagesHighlight: () => state.pages.highlight,
      };

      return result;
    };

    return (
      <NestedDefaultPropsContext value={getDefaultPropsContext()}>
        {props.children}
      </NestedDefaultPropsContext>
    );
  }, DefaultProps)
);
