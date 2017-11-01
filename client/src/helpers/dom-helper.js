export const scrollElement = (className, scroll) => {
  document.getElementsByClassName(className)[0].scrollTop += scroll;
};

export const isScrollExist = (holderElement, eventsListElement) => {
  return holderElement.offsetHeight <= eventsListElement.scrollHeight
};

export const isElementAbove = (eventsListElement) => {
  return eventsListElement.scrollTop > 0;
};

export const isElementBelow = (eventsListElement) => {
  return eventsListElement.scrollHeight - eventsListElement.scrollTop - eventsListElement.offsetHeight !== 0;
};