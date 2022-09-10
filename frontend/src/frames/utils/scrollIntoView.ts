import scrollIntoViewIfNeeded from 'smooth-scroll-into-view-if-needed';

export function scrollIntoView(elm: any, boundary?: any) {
  if (elm) {
    return scrollIntoViewIfNeeded(elm, {
      block: 'nearest',
      boundary: boundary,
      behavior: 'smooth',
    });
  }
}
