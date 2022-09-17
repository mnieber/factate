import jQuery from 'jquery';
import scrollIntoViewIfNeeded from 'smooth-scroll-into-view-if-needed';

export const scrollToNextHeading = (
  parentElm: any,
  isVisible: Function,
  isDown: boolean
) => {
  const parentRect = parentElm.getBoundingClientRect();
  const headings = jQuery(parentElm).find('h1, h2, h3');
  let nextHeading = null;

  if (isDown) {
    for (let i = 0; i < headings.length && !nextHeading; i++) {
      const heading = headings[i];
      const isHeadingVisible = isVisible(heading);
      const headingRect = heading.getBoundingClientRect();
      if (
        (isHeadingVisible && headingRect.top > parentRect.top) ||
        (!isHeadingVisible && headingRect.top > parentRect.bottom)
      ) {
        nextHeading = heading;
      }
    }
  } else {
    for (let i = headings.length - 1; i >= 0 && !nextHeading; i--) {
      const heading = headings[i];
      const isHeadingVisible = isVisible(heading);
      const headingRect = heading.getBoundingClientRect();
      if (!isHeadingVisible && headingRect.bottom < parentRect.top) {
        nextHeading = heading;
      }
    }
  }
  if (nextHeading) {
    scrollIntoViewIfNeeded(nextHeading, {
      scrollMode: 'always',
      block: 'start',
      boundary: undefined,
      behavior: 'smooth',
      ease: (t) => t,
      duration: 150,
    });
  }
};
