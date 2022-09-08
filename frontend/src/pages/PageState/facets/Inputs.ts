import { input } from 'skandha';
import { PageT } from 'src/api/types/PageT';

export class Inputs {
  @input pages: Array<PageT> = [];

  static className = () => 'Inputs';
}
