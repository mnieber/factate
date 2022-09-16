export type SectionT = {
  type: 'example' | 'standard';
  id: string;
  title: string;
  level: number;
  text: string;
};

export type SectionByIdT = { [id: string]: SectionT };

export const createTitle = (section: SectionT): string => {
  const infix = section.type === 'example' ? 'Example: ' : '';
  return '#'.repeat(section.level) + ' ' + infix + section.title + '\n';
};
