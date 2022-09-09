import { action } from 'mobx';
import * as R from 'ramda';
import { cleanUpCtr } from 'react-default-props-context';
import * as Skandha from 'skandha';
import { createConnector } from 'skandha';
import { Highlight } from 'skandha-facets/Highlight';
import { registerCtr } from 'skandha-mobx';
import { PageT } from 'src/api/types/PageT';
import { SnippetT } from 'src/api/types/SnippetT';
import { Inputs } from 'src/pages/PageState/facets/Inputs';
import { Outputs } from 'src/pages/PageState/facets/Outputs';
import { initCodeBlocks } from 'src/pages/PageState/initCodeBlocks';
import { initFacts } from 'src/pages/PageState/initFacts';
import { initPages } from 'src/pages/PageState/initPages';
import { initSnippets } from 'src/pages/PageState/initSnippets';
import { hasId } from 'src/utils/ids';

export type PropsT = {};

export class PageState {
  data = {
    inputs: new Inputs(),
    outputs: new Outputs(),
  };

  pages = {
    highlight: new Highlight(),
  };

  snippets = {
    highlight: new Highlight(),
  };

  facts = {
    highlight: new Highlight(),
  };

  codeBlocks = {
    highlight: new Highlight(),
  };

  @action setPages(pages: PageT[]) {
    this.data.inputs.pages = pages;
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

    con.connect();
  }

  _snippetsMapData(props: PropsT) {
    const con = createConnector(this);
    const getSnippetById = (id: string) =>
      R.find(hasId(id), this.pages.highlight.item?.snippets ?? []);
    const getSnippetsFromPage = (page?: PageT) => page?.snippets ?? [];

    con['snippets.highlight'].item =
      con['snippets.highlight'].id.tf(getSnippetById);
    con['data.outputs'].snippetsDisplay =
      con['pages.highlight'].item.tf(getSnippetsFromPage);

    con.connect();
  }

  _factsMapData(props: PropsT) {
    const con = createConnector(this);
    const getFactById = (id: string) =>
      R.find(hasId(id), this.snippets.highlight.item?.facts ?? []);
    const getFactsFromSnippet = (snippet?: SnippetT) => snippet?.facts ?? [];

    con['facts.highlight'].item = con['facts.highlight'].id.tf(getFactById);
    con['data.outputs'].factsDisplay =
      con['snippets.highlight'].item.tf(getFactsFromSnippet);

    con.connect();
  }

  _codeBlocksMapData(props: PropsT) {
    const con = createConnector(this);
    const getCodeBlockById = (id: string) =>
      R.find(hasId(id), this.snippets.highlight.item?.codeBlocks ?? []);
    const getCodeBlocksFromSnippet = (snippet?: SnippetT) =>
      snippet?.codeBlocks ?? [];

    con['codeBlocks.highlight'].item =
      con['codeBlocks.highlight'].id.tf(getCodeBlockById);
    con['data.outputs'].codeBlocksDisplay = con['snippets.highlight'].item.tf(
      getCodeBlocksFromSnippet
    );

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
      ctr: this.snippets,
      options: { name: 'PageState.Snippets' },
      initCtr: () => {
        initSnippets(this, props);
        this._snippetsMapData(props);
      },
    });

    registerCtr({
      ctr: this.facts,
      options: { name: 'PageState.Facts' },
      initCtr: () => {
        initFacts(this, props);
        this._factsMapData(props);
      },
    });

    registerCtr({
      ctr: this.codeBlocks,
      options: { name: 'PageState.CodeBlocks' },
      initCtr: () => {
        initCodeBlocks(this, props);
        this._codeBlocksMapData(props);
      },
    });

    registerCtr({
      ctr: this.data,
      options: { name: 'PageState.Data' },
    });
  }
}
