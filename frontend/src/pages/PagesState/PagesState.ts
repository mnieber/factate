import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps, pmap } from 'skandha';
import { Highlight } from 'skandha-facets/Highlight';
import { registerCtr } from 'skandha-mobx';
import { PageT } from 'src/api/types/PageT';
import { GlossariesData, initGlossaries } from './glossaries';
import { initPages, PagesData } from './pages';

export type PropsT = {};

export class PagesState {
  glossaries = {
    data: new GlossariesData(),
  };

  pages = {
    data: new PagesData(),
    highlight: new Highlight<PageT>(),
  };

  _glossariesMapData(props: PropsT) {}

  _pagesMapData(props: PropsT) {
    const getPageById = (x: string | undefined) =>
      x ? this.pages.data.pageById[x] : undefined;

    mapDataToProps(
      pmap(
        //
        [this.pages.highlight, 'item'],
        () => getPageById(this.pages.highlight.id)
      )
    );
  }

  getSummary() {
    return {
      glossaries: Skandha.getCtrState(this.glossaries),
      pages: Skandha.getCtrState(this.pages),
    };
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this.glossaries,
      options: { name: 'PagesState.Glossaries' },
      initCtr: () => {
        initGlossaries(this, props);
        this._glossariesMapData(props);
      },
    });

    registerCtr({
      ctr: this.pages,
      options: { name: 'PagesState.Pages' },
      initCtr: () => {
        initPages(this, props);
        this._pagesMapData(props);
      },
    });
  }
}
