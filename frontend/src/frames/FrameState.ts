import { action, makeObservable, observable } from 'mobx';

export class FrameState {
  @observable displayWidth: number = window.screen.width;

  @action
  setDisplayWidth(width: number) {
    this.displayWidth = width;
  }

  constructor() {
    makeObservable(this);
  }
}
