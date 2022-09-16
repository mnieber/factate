import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { createConnector } from 'skandha';
import { Highlight } from 'skandha-facets/Highlight';
import { registerCtr } from 'skandha-mobx';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { PageT } from 'src/api/types/PageT';
import { Inputs } from 'src/pages/PageState/facets/Inputs';
import { Outputs } from 'src/pages/PageState/facets/Outputs';
import { initPages } from 'src/pages/PageState/initPages';

export type PropsT = {};

export class PageState {
  data = {
    inputs: new Inputs(),
    outputs: new Outputs(),
  };

  pages = {
    highlight: new Highlight(),
  };

  setPages(pages: PageT[]) {
    this.data.inputs.pages = pages;
  }

  setGlossaries(glossaries: GlossaryT[]) {
    this.data.inputs.glossaries = glossaries;
  }

  getSummary() {
    return Skandha.getCtrState(this);
  }

  destroy() {
    cleanUpCtr(this);
  }

  _pagesMapData(props: PropsT) {
    const con = createConnector(this);
    const getPageById = (x: string) => this.data.outputs.pageById[x];

    con['pages.highlight'].item = con['pages.highlight'].id.tf(getPageById);
    con['data.outputs'].pagesDisplay = con['data.inputs'].pages;
    con['data.outputs'].glossariesDisplay = con['data.inputs'].glossaries;

    con.connect();
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this.pages,
      options: { name: 'PageState.Pages' },
      initCtr: () => {
        initPages(this, props);
        this._pagesMapData(props);
      },
    });

    registerCtr({
      ctr: this.data,
      options: { name: 'PageState.Data' },
    });
  }
}
