import { input, output } from 'skandha';
import { GlossaryByIdT, GlossaryT } from 'src/api/types/GlossaryT';
import { listToItemById } from 'src/utils/ids';

export class GlossariesData {
  static className = () => 'GlossariesData';

  @input glossaries: Array<GlossaryT> = [];
  @output glossariesDisplay: Array<GlossaryT> = [];

  @output get glossaryById(): GlossaryByIdT {
    return listToItemById(this.glossariesDisplay);
  }
}
