import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  NestedDefaultPropsContext,
  withDefaultProps,
} from 'react-default-props-context';
import { getPages } from 'src/api/queries/useGetPages';
import { PagesState } from 'src/pages/PagesState';
import { ObjT } from 'src/utils/types';

type PropsT = React.PropsWithChildren<{}>;

const DefaultProps = {};

export const PagesStateProvider = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const [state] = React.useState(() => new PagesState({}));

    React.useEffect(() => {
      getPages({})
        .then((pages: ObjT) => {
          state.setPages(pages.pages);
          state.setGlossaries(pages.glossaries);
          state.pages.highlight.highlightItem(pages.pages[0]?.id);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }, [state]);

    const getDefaultPropsContext = () => {
      const result = { defaultProps: {} };

      result.defaultProps = {
        ...result.defaultProps,
        pages: () => state.pages.data.pages,
        pagesHighlight: () => state.pages.highlight,
        page: () => state.pages.highlight.item,
        pagesRS: () => (state.pages.data.pages.length ? 'loaded' : 'loading'),
      };

      result.defaultProps = {
        ...result.defaultProps,
        glossaries: () => {
          return state.pages.data.glossaries;
        },
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
