import { action, makeObservable } from 'mobx';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { mapDataToProps } from 'skandha';
import { Highlight } from 'skandha-facets/Highlight';
import { registerCtr } from 'skandha-mobx';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { PageT } from 'src/api/types/PageT';
import { initPages, PagesData } from 'src/pages/PagesState/initPages';

export type PropsT = {};

export class PagesState {
  pages = {
    data: new PagesData(),
    highlight: new Highlight(),
  };

  @action setPages(pages: PageT[]) {
    this.pages.data.pages = pages;
  }

  @action setGlossaries(glossaries: GlossaryT[]) {
    this.pages.data.glossaries = glossaries;
  }

  getSummary() {
    return Skandha.getCtrState(this);
  }

  destroy() {
    cleanUpCtr(this);
  }

  _pagesMapData(props: PropsT) {
    const getPageById = (x: string | undefined) =>
      x ? this.pages.data.pageById[x] : undefined;

    mapDataToProps([
      [this.pages.highlight, 'item'],
      () => getPageById(this.pages.highlight.id),
    ]);
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this.pages,
      options: { name: 'PagesState.Pages' },
      initCtr: () => {
        initPages(this, props);
        this._pagesMapData(props);
      },
    });

    makeObservable(this);
  }
}
