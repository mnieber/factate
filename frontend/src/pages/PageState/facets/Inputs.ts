import { input } from 'skandha';
import { PageT } from 'src/api/types/PageT';
import { TermT } from 'src/api/types/TermT';

export class Inputs {
  @input pages: Array<PageT> = [];
  @input terms: Array<TermT> = [];

  static className = () => 'Inputs';
}
