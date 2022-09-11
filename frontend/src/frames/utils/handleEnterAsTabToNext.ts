export function findNextTabStop(
  el: any,
  selectors?: string,
  forward?: boolean
) {
  var universe = document.querySelectorAll(
    selectors ?? 'input, button, select, textarea, a[href]'
  );
  var list = Array.prototype.filter.call(universe, function (item) {
    return item.tabIndex >= '0';
  });
  var index = list.indexOf(el);

  return forward ?? true
    ? list[index + 1] || list[0]
    : list[index - 1] || list[list.length - 1];
}

export function findNextElm(el: any, selectors: string, forward: boolean) {
  var universe = document.querySelectorAll(selectors);
  var list = Array.prototype.filter.call(universe, function (item) {
    return true;
  });
  var index = list.indexOf(el);

  return forward ?? true ? list[index + 1] : list[index - 1];
}

export function handleEnterAsTabToNext(event: any, isPreventDefault?: boolean) {
  if (event.keyCode === 13) {
    findNextTabStop(event.target).focus();
    if (isPreventDefault ?? true) {
      event.preventDefault();
    }
  }
}
