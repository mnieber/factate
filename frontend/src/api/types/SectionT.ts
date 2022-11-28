export type SectionT = {
  id: string;
  level: number;
  text: string;
  title: string;
  type: 'example' | 'standard';
};

export type SectionByIdT = { [id: string]: SectionT };

export const createTitle = (section: SectionT): string => {
  const infix = section.type === 'example' ? 'Example: ' : '';
  return '#'.repeat(section.level) + ' ' + infix + section.title + '\n';
};
