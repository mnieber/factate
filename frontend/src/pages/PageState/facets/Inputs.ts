import { input } from 'skandha';
import { GlossaryT } from 'src/api/types/GlossaryT';
import { PageT } from 'src/api/types/PageT';

export class Inputs {
  @input pages: Array<PageT> = [];
  @input glossaries: Array<GlossaryT> = [];

  static className = () => 'Inputs';
}
