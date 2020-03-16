function alterClass(addOrRemove) {
  return (classToRemove, element) =>
    addOrRemove === 'add' ?
    element.classList.add(classToRemove) :
    element.classList.remove(classToRemove);
}
const addClass = alterClass('add');
const removeClass = alterClass('remove');

function getElementByDataset(
  data,
  searchString,
  specifier = '',
  elementToSearch = document
) {
  return elementToSearch.querySelector(
    `${specifier}[data-${data}="${searchString}"]`
  );
}

function setStyles(elem, styleObj) {
  for (var key in styleObj) {
    elem.style[key] = styleObj[key]
  }
}

function setAttributes(elem, attObj) {
  for (var key in attObj) {
    elem.setAttribute(key, attObj[key])
  }
}