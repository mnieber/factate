import { observer } from 'mobx-react-lite';
import * as R from 'ramda';
import React from 'react';
import {
  NestedDefaultPropsProvider,
  withDefaultProps,
} from 'react-default-props-context';
import { getPages } from 'src/api/queries/getPages';
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
          state.setGlossaries(pages.glossaries);
          state.pages.highlight.highlightItem(pages.pages[0]?.id);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }, [state]);

    const getDefaultProps = () => {
      return R.mergeAll([
        {
          pages: () => state.pages.data.pages,
          pagesHighlight: () => state.pages.highlight,
          page: () => state.pages.highlight.item,
          pagesRS: () => (state.pages.data.pages.length ? 'loaded' : 'loading'),
        },
        {
          glossaries: () => {
            return state.pages.data.glossaries;
          },
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
