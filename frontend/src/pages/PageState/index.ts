import * as R from 'ramda';
import {
  addCleanUpFunctionToCtr,
  cleanUpCtr,
} from 'react-default-props-context';
import * as Skandha from 'skandha';
import { createConnector } from 'skandha';
import { Highlight } from 'skandha-facets/Highlight';
import { registerCtr } from 'skandha-mobx';
import { PageT } from 'src/api/types/PageT';
import { SnippetT } from 'src/api/types/SnippetT';
import { Inputs } from 'src/pages/PageState/facets/Inputs';
import { Outputs } from 'src/pages/PageState/facets/Outputs';
import { hasId } from 'src/utils/ids';

type PropsT = {};

export class PageState {
  inputs: Inputs = new Inputs();
  outputs: Outputs = new Outputs();

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

  setPages(pages: PageT[]) {
    this.inputs.pages = pages;
  }

  _setPagesCallbacks(props: PropsT) {}
  _setSnippetsCallbacks(props: PropsT) {}
  _setFactsCallbacks(props: PropsT) {}
  _setCodeBlocksCallbacks(props: PropsT) {}

  _applyPagesPolicies(props: PropsT) {
    const con = createConnector(this);
    const getPageById = (x: string) => this.outputs.pageById[x];

    con['pages.highlight'].item = con['pages.highlight'].id.tf(getPageById);
    con['outputs'].pagesDisplay = con['inputs'].pages;

    con.connect();
  }

  _applySnippetsPolicies(props: PropsT) {
    const con = createConnector(this);
    const getSnippetById = (id: string) =>
      R.find(hasId(id), this.pages.highlight.item?.snippets ?? []);

    con['snippets.highlight'].item =
      con['snippets.highlight'].id.tf(getSnippetById);
    con['outputs'].snippetsDisplay = con['inputs'].snippets;

    con.connect();
  }

  _applyFactsPolicies(props: PropsT) {
    const con = createConnector(this);
    const getFactById = (id: string) =>
      R.find(hasId(id), this.snippets.highlight.item?.facts ?? []);
    const getFactsFromSnippet = (snippet?: SnippetT) => snippet?.facts ?? [];

    con['facts.highlight'].item = con['facts.highlight'].id.tf(getFactById);
    con['outputs'].factsDisplay =
      con['snippets.highlight'].item.tf(getFactsFromSnippet);

    con.connect();
  }

  _applyCodeBlocksPolicies(props: PropsT) {
    const con = createConnector(this);
    const getCodeBlockById = (id: string) =>
      R.find(hasId(id), this.snippets.highlight.item?.codeBlocks ?? []);

    con['codeBlocks.highlight'].item =
      con['codeBlocks.highlight'].id.tf(getCodeBlockById);
    con['outputs'].codeBlocksDisplay = con['snippets.highlight'].item.tf(
      (snippet?: SnippetT) => snippet?.codeBlocks ?? []
    );

    con.connect();
  }

  getSummary() {
    return Skandha.getCtrState(this);
  }

  destroy() {
    cleanUpCtr(this);
  }

  constructor(props: PropsT) {
    registerCtr({
      ctr: this,
      options: { name: 'PageState', members: [] },
    });

    registerCtr({
      ctr: this.inputs,
      options: { name: Inputs.className(), members: [] },
    });

    registerCtr({
      ctr: this.outputs,
      options: { name: Outputs.className(), members: [] },
    });

    registerCtr({
      ctr: this.pages,
      options: { name: 'Pages' },
      initCtr: () => {
        this._setPagesCallbacks(props);
        this._applyPagesPolicies(props);
        addCleanUpFunctionToCtr(this, () => cleanUpCtr(this.pages));
      },
    });

    registerCtr({
      ctr: this.snippets,
      options: { name: 'Snippets' },
      initCtr: () => {
        this._setSnippetsCallbacks(props);
        this._applySnippetsPolicies(props);
        addCleanUpFunctionToCtr(this, () => cleanUpCtr(this.snippets));
      },
    });

    registerCtr({
      ctr: this.facts,
      options: { name: 'Facts' },
      initCtr: () => {
        this._setFactsCallbacks(props);
        this._applyFactsPolicies(props);
        addCleanUpFunctionToCtr(this, () => cleanUpCtr(this.facts));
      },
    });

    registerCtr({
      ctr: this.codeBlocks,
      options: { name: 'CodeBlocks' },
      initCtr: () => {
        this._setCodeBlocksCallbacks(props);
        this._applyCodeBlocksPolicies(props);
        addCleanUpFunctionToCtr(this, () => cleanUpCtr(this.codeBlocks));
      },
    });
  }
}
